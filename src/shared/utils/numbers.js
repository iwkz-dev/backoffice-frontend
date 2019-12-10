export const transformDecimalNumber = (num) => {
  const decimalNumber = Number(num.replace(',', '.'));

  return isNaN(decimalNumber) ? 0 : decimalNumber;
};
