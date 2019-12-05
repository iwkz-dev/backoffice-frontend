import { has } from 'lodash';

export const generateEmptyErrors = () => ({
  errors: [],
  message: '',
});

export const handleApiErrors = (response) => {
  const error = generateEmptyErrors();

  if (has(response, 'errors')) {
    const { errors, message } = response.errors;

    error.errors = errors;
    error.message = message;
  }

  return error;
};
