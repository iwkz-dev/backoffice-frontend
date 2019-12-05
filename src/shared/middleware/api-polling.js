import loadConfiguration from 'shared/utils/config';
import createPollingAPIMiddleware from './helpers/pollingConnection';

export const IWKZ_API_POLLING = 'IWKZ_API_POLLING';

export default createPollingAPIMiddleware({
  actionKey: IWKZ_API_POLLING,

  async apiRoot() {
    const { API_ROOT } = await loadConfiguration();
    return API_ROOT;
  },
});
