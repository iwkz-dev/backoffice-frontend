import { convertArrayForGetRequest } from '../apiHelpers';

describe('Test apiHelpers', () => {
  it('convertArrayForGetRequest withArray shouldReturnString', () => {
    const expectedResult = '[Test 1,Test 2,Test 3]';
    const result = convertArrayForGetRequest(['Test 1', 'Test 2', 'Test 3']);

    expect(result).toEqual(expectedResult);
  });

  it('convertArrayForGetRequest withEmptyArray shouldReturnEmpty', () => {
    const expectedResult = [];
    const result = convertArrayForGetRequest([]);

    expect(result).toEqual(expectedResult);
  });

  it('convertArrayForGetRequest withEmptyArrayAndConfig shouldReturnStringEmptyArray', () => {
    const expectedResult = '[]';
    const result = convertArrayForGetRequest([], {
      keepEmptyArrayFilter: true,
    });

    expect(result).toEqual(expectedResult);
  });
});
