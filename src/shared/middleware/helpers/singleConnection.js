import 'whatwg-fetch';
import { isFSA } from 'flux-standard-action';
import saveAs from 'file-saver';
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
import { METHOD_POST, METHOD_PATCH, METHOD_PUT } from 'shared/constants/httpMethod';
import {
  callAPI,
  normalizeErrorsFromBody,
  phraseErrorsAsSingleMessage,
  mergeRequestAndResponseEntities,
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

export default ({ actionKey, apiRoot }) => (store) => (next) => async (action) => {
  const apiAction = action[actionKey];

  if (typeof apiAction === 'undefined') {
    return next(action);
  }

  let { endpoint } = apiAction;
  const {
    method, params, actionParams, multipart, handledStatusCodes, download,
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
    payload: {
      ...endpoint.params,
      body: params,
    },
    ...(actionParams && Object.keys(actionParams).length && {
      params: actionParams,
    }),
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
    const { body } = response;
    const errors = body;
    const errorActions = [
      failureActionFromResponse(failureType, response.statusCode, errors, endpoint.params),
    ];

    if (!includes(handledStatusCodes, response.statusCode)) {
      errorActions.push(createError(phraseErrorsAsSingleMessage(errors)));
    }
    next(errorActions);
  }

  function dispatchSuccess(response) {
    let { body } = response;

    if (download && requestType.meta && requestType.meta.docType) {
      const file = new File([response.body.blob], `datev-export-${requestType.meta.docType}.txt`, { type: 'text/plain;charset=ISO-8859-1' });
      saveAs(file);
    }

    if (includes([METHOD_POST, METHOD_PATCH, METHOD_PUT], method)) {
      body = mergeRequestAndResponseEntities(params, body);
    }

    next(actionWith(merge({}, successType, {
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
    if (response.statusCode >= 400) {
      return dispatchError(response);
    }
    return dispatchSuccess(response);
  } catch (errorResponse) {
    return dispatchError(errorResponse);
  }
};
