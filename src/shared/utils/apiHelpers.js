export const convertArrayForGetRequest = (arr, config = {}) => {
  const { keepEmptyArrayFilter = false } = config;

  if (!arr.length) {
    return keepEmptyArrayFilter ? '[]' : [];
  }

  return `[${arr.join(',')}]`;
};
