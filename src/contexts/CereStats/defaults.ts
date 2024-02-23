import type { CereStatsContextInterface } from './types';

export const defaultCereStatsContext: CereStatsContextInterface = {
  // eslint-disable-next-line
  fetchEraPoints: (v, e) => {},
  payouts: [],
  poolClaims: [],
  unclaimedPayouts: [],
};
