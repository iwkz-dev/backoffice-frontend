import {
  defaultLocale,
  getLocaleFromLanguage,
  translate,
} from '../translationsService';

import {
  LANGUAGE,
  setCurrentLocale,
  setLocalization,
  getCurrentLocale,
  clearAll,
} from '../translationsService/helpers';

describe('Test translationsService', () => {
  beforeAll(() => {
    setCurrentLocale(defaultLocale);
    setLocalization(defaultLocale, {
      'attribute.name': 'Name',
      'attribute.number': '50 %%currency%%',
    });
  });

  afterAll(() => {
    clearAll();
  });

  it('getCurrentLocale shouldReturnCurrentLocale', () => {
    const expectedResult = defaultLocale;
    const result = getCurrentLocale();

    expect(result).toEqual(expectedResult);
  });

  it('getLocaleFromLanguage withValidLanguage shouldReturnLocale', () => {
    const expectedResult = LANGUAGE.de;
    const result = getLocaleFromLanguage('de');

    expect(result).toEqual(expectedResult);
  });

  it('getLocaleFromLanguage withInValidLanguage shouldReturnDefaultLOcale', () => {
    const expectedResult = defaultLocale;
    const result = getLocaleFromLanguage('id');

    expect(result).toEqual(expectedResult);
  });

  it('translate withExistingKey shouldReturnTranslatedText', () => {
    const expectedResult = 'Name';
    const result = translate('attribute.name');

    expect(result).toEqual(expectedResult);
  });

  it('translate withNoExistingKey shouldReturnKey', () => {
    const expectedResult = 'attribute.email';
    const result = translate(expectedResult);

    expect(result).toEqual(expectedResult);
  });

  it('translate withExistingKeyAndParams shouldReturnStringAndReplaceParams', () => {
    const expectedResult = '50 €';
    const result = translate('attribute.number', {
      '%%currency%%': '€',
    });

    expect(result).toEqual(expectedResult);
  });

  it('translate withExistingKeyAndParams shouldReturnKey', () => {
    const expectedResult = 'attribute.money';
    const result = translate(expectedResult, {
      '%%currency%%': '€',
    });

    expect(result).toEqual(expectedResult);
  });
});
