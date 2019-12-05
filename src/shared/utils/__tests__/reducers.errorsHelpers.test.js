import {
  generateEmptyErrors,
  handleApiErrors,
} from '../reducers/errorsHelpers';
import { entryIsErroneous } from '../reducers';

describe('Test Reducers errorsHelpers', () => {
  const defaultErrors = {
    formErrors: [],
    fieldErrors: {},
  };
  const mockResponse = {
    data: {},
    errors: {
      fieldErrors: [
        {
          field: 'name',
          error: 'name.required',
        },
        {
          field: 'age',
          error: 'wrong.age.format',
        },
      ],
      formErrors: ['error.message'],
    },
  };

  it('generateEmptyErrors shouldReturnDefaultErrors', () => {
    const expectedResult = defaultErrors;
    const result = generateEmptyErrors();

    expect(result).toEqual(expectedResult);
  });

  it('handleApiErrors withEmptyResponse shouldReturnDefaultErrors', () => {
    const expectedResult = defaultErrors;
    const result = handleApiErrors({});

    expect(result).toEqual(expectedResult);
  });

  it('handleApiErrors withFieldAndFormErrorsResponse shouldReturnFieldAndFormErrors', () => {
    const expectedResult = {
      fieldErrors: {
        name: 'name.required',
        age: 'wrong.age.format',
      },
      formErrors: ['error.message'],
    };
    const result = handleApiErrors(mockResponse);

    expect(result).toEqual(expectedResult);
  });

  it('handleApiErrors withFieldErrorsResponse shouldReturnFieldErrorsAndEmptyFormErrors', () => {
    const expectedResult = {
      fieldErrors: {
        name: 'name.required',
        age: 'wrong.age.format',
      },
      formErrors: [],
    };

    const { fieldErrors } = mockResponse.errors;
    const result = handleApiErrors({
      errors: {
        fieldErrors,
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('handleApiErrors withFormErrorsResponse shouldReturnFormErrorsAndEmptyFieldsErrors', () => {
    const expectedResult = {
      fieldErrors: {},
      formErrors: ['error.message'],
    };

    const { formErrors } = mockResponse.errors;
    const result = handleApiErrors({
      errors: {
        formErrors,
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('entryIsErroneous withErrorResponse shouldReturnTrue', () => {
    const result = entryIsErroneous(mockResponse);

    expect(result).toBeTruthy();
  });

  it('entryIsErroneous withNoErrorResponse shouldReturnFalse', () => {
    const result = entryIsErroneous({
      ...mockResponse,
      errors: defaultErrors,
    });

    expect(result).toBeFalsy();
  });
});
