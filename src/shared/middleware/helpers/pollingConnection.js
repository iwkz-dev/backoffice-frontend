/* eslint-disable no-await-in-loop */

import 'whatwg-fetch';
import { isFSA } from 'flux-standard-action';
import {
  includes,
  merge,
  isString,
  isFunction,
  isObject,
  forOwn,
  replace,
} from 'lodash';
import { createError } from 'shared/utils/actions/errorActions';
import { METHOD_GET } from 'shared/constants/httpMethod';
import {
  callAPI,
  phraseErrorsAsSingleMessage,
} from './index';

function normalizeActionTypes(types) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  return types.map((type) => {
    if (isFSA(type)) {
      return type;
    }

    if (isString(type)) {
      return { type };
    }

    throw new Error('Expected action types to be strings or FSA objects.');
  });
}

function interpolateUrl(path, params) {
  forOwn(params, (value, key) => {
    path = replace(path, new RegExp(`\\:${key}`), value);
  });

  return path;
}

function normalizeEndpoint(store, endpoint) {
  if (isFunction(endpoint)) {
    endpoint = {
      path: endpoint(store.getState()),
    };
  } else if (isString(endpoint)) {
    endpoint = {
      path: endpoint,
    };
  }

  if (!isObject(endpoint)) {
    throw new Error('Specify an endpoint which is string, function or an object.');
  }

  if (!isString(endpoint.path)) {
    throw new Error('Specify a path string in endpoint object.');
  }

  endpoint = { params: {}, ...endpoint };
  endpoint.path = interpolateUrl(endpoint.path, endpoint.params);

  return endpoint;
}

const normalizeErrorsFromBody = (response) => {
  if (!response) {
    return null;
  }

  const { errors } = response;

  const result = {
    fieldErrors: [],
    formErrors: [],
  };

  if (errors && Array.isArray(errors)) {
    errors.forEach((error) => {
      if (Array.isArray(error.fields)) {
        error.fields.forEach((field) => {
          result.fieldErrors.push({
            field,
            error: error.message,
          });
        });
      } else {
        result.formErrors.push(error.message);
      }
    });
  }

  return result;
};

export default ({ actionKey, apiRoot }) => (store) => (next) => async (action) => {
  const apiAction = action[actionKey];
  if (typeof apiAction === 'undefined') {
    return next(action);
  }

  let { endpoint } = apiAction;
  const {
    method,
    params,
    actionParams,
    multipart,
    handledStatusCodes,
    download,
  } = apiAction;

  endpoint = normalizeEndpoint(store, endpoint);

  const [requestType, successType, failureType] = normalizeActionTypes(apiAction.types);

  function actionWith(data) {
    const finalAction = merge({}, data, action);
    delete finalAction[actionKey];
    return finalAction;
  }

  next(actionWith({
    ...requestType,
    ...(actionParams && Object.keys(actionParams).length && {
      params: actionParams,
    }),
    payload: endpoint.params,
  }));

  function failureActionFromResponse(failureAction, statusCode, errors, endpointParams) {
    return merge(failureAction, {
      error: true,
      payload: {
        errors,
        statusCode,
        ...endpointParams,
      },
      ...(actionParams && Object.keys(actionParams).length && {
        params: actionParams,
      }),
    });
  }

  function dispatchError(response) {
    const handledLogoutResponse = response.statusCode === 403
      && response.body.error
      && response.body.error === 'logout';

    if (handledLogoutResponse) {
      window.location.reload();
      return;
    }

    const unhandledLogoutResponse = response.statusCode === 503
      && response.body.message
      && response.body.message.toLowerCase().includes('syntax');

    let errors;

    if (unhandledLogoutResponse) {
      errors = ['message.error.unknown'];
    } else {
      errors = normalizeErrorsFromBody(response.body);
    }

    const errorActions = [failureActionFromResponse(
      failureType,
      response.statusCode,
      errors,
      endpoint.params,
    )];

    if (!includes(handledStatusCodes, response.statusCode)) {
      errorActions.push(createError(phraseErrorsAsSingleMessage(errors)));
    }

    return next(errorActions);
  }

  function dispatchSuccess(response) {
    const { body } = response;

    return next(actionWith(merge({}, successType, {
      payload: {
        ...endpoint.params,
        ...response,
        body,
      },
      ...(actionParams && Object.keys(actionParams).length && {
        params: actionParams,
      }),
    })));
  }

  try {
    const response = await callAPI({
      apiRoot: await apiRoot(),
      endpoint: endpoint.path,
      method,
      params,
      multipart,
      download,
      authToken: store.getState().auth ? store.getState().auth.token : null,
    });

    if (response.statusCode === 200 || response.statusCode === 202 || response.statusCode === 204) {
      const pollId = endpoint.idAccessor(response);
      let pollResponse;

      do {
        pollResponse = await callAPI({
          apiRoot: await apiRoot(),
          endpoint: endpoint.path + pollId,
          method: METHOD_GET,
          params: {},
          authToken: store.getState().auth ? store.getState().auth.token : null,
        });

        if (pollResponse.statusCode >= 400) {
          return dispatchError(response);
        }
      } while (endpoint.statusAccessor(pollResponse) === endpoint.processingStatus);

      pollResponse.body.jobId = pollId;
      if (endpoint.statusAccessor(pollResponse) === 'FAILED') {
        return dispatchError(pollResponse);
      }

      return dispatchSuccess(pollResponse);
    }

    if (response.statusCode >= 400) {
      return dispatchError(response);
    }
  } catch (errorResponse) {
    return dispatchError(errorResponse);
  }
};
