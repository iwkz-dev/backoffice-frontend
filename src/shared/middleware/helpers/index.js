import { get, isString, forOwn } from 'lodash';
import queryString from 'query-string';
import url from 'url';
import { NO_CONTENT } from 'http-status-codes';
import { METHOD_GET } from 'shared/constants/httpMethod';

import {
  TOKEN_KEY,
  TOKEN_TYPE,
  UNKNOWN_ERROR,
  ERRORS_MAP,
} from '../constants';

export async function callAPI({
  apiRoot, endpoint, method, params, multipart, download = false, authToken,
}) {
  try {
    let absolute = false;

    if (url.parse(endpoint).host !== null) {
      absolute = true;
    }

    let endpointPath = (absolute ? '' : apiRoot) + endpoint;

    let headers = {};
    if (authToken !== null) {
      headers = {
        [TOKEN_KEY]: `${TOKEN_TYPE} ${authToken}`,
      };
    }

    const fetchOptions = {
      method: METHOD_GET,
      credentials: 'same-origin',
      headers,
    };

    // Append params depended on method
    if (method !== METHOD_GET) {
      fetchOptions.method = method;

      if (multipart) {
        const formData = new FormData();

        forOwn(params.files, (value, key) => {
          formData.append(key, value);
        });

        if (params.meta) {
          formData.append('metadata', new Blob([JSON.stringify(params.meta)], {
            type: 'application/json',
          }));
        }

        if (params.data) {
          forOwn(params.data, (value, key) => {
            formData.append(key, value);
          });
        }

        fetchOptions.body = formData;
      } else {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(params);
      }
    } else if (absolute === false) {
      endpointPath = endpointPath + (Object.keys(params).length > 0 ? '?' : '') + queryString.stringify(params);
    }

    const response = await fetch(endpointPath, fetchOptions);

    let body = {
      data: [],
    };

    if (download) {
      body = { ...body, blob: await response.blob() };
    } else if (response.status !== NO_CONTENT) {
      try {
        body = await response.json();
      } catch (jsonError) {
        // keep the default body if endpoint returns no data for other status than 204
      }
    }

    return {
      body,
      headers: response.headers,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers: {},
      body: {
        message: error.toString(),
      },
    };
  }
}

export function phraseErrorsAsSingleMessage(errors) {
  if (isString(errors[0])) {
    return errors[0];
  }

  if (isString(get(errors, '[0].message'))) {
    return errors[0].message;
  }

  if (get(errors, 'formErrors.[0]')) {
    const errorStr = get(errors, 'formErrors.[0]');
    if (ERRORS_MAP[errorStr]) {
      return ERRORS_MAP[errorStr];
    }
  }

  return UNKNOWN_ERROR;
}

export function normalizeErrorsFromBody(body = {}) {
  if (Array.isArray(body.errors)) {
    return body.errors;
  }

  if (isString(body.message)) {
    return [body.message];
  }

  if (Array.isArray(body.field_errors) && body.field_errors.length > 0) {
    return {
      fieldErrors: body.field_errors,
    };
  }

  if (Array.isArray(body.form_errors) && body.form_errors.length > 0) {
    return {
      formErrors: body.form_errors,
    };
  }

  return [UNKNOWN_ERROR];
}

export function mergeRequestAndResponseEntities(requestBody, responseBody) {
  if (requestBody && responseBody) {
    return Object.assign(requestBody, (responseBody.data && responseBody.data.length)
      ? responseBody.data[0] : responseBody || {});
  }

  return responseBody;
}
