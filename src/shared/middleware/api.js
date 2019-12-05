import loadConfiguration from 'shared/utils/config';
import createAPIMiddleware from './helpers/singleConnection';

export const IWKZ_API = 'IWKZ_API';

export default createAPIMiddleware({
  actionKey: IWKZ_API,

  async apiRoot() {
    const { API_ROOT } = await loadConfiguration();
    return API_ROOT;
  },
});
