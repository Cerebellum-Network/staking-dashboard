// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

/*
 * Global Constants
 */
export const URI_PREFIX = '';
export const TITLE_DEFAULT = 'Cere Staking Dashboard';
export const DAPP_NAME = 'cere_staking_dashboard';
export const CERE_URL = 'https://cere.network';

export const POLKADOT_ENDPOINT = 'wss://rpc.polkadot.io';
export const WESTEND_ENDPOINT = 'wss://westend-rpc.polkadot.io';
export const DEFAULT_NETWORK = 'cereMainnet';
export const ACTIVE_NETWORK = 'cereMainnet';

/*
 * Data Structure Helpers
 */
export const EmptyH256 = new Uint8Array(32);
export const ModPrefix = stringToU8a('modl');
export const U32Opts = { bitLength: 32, isLe: true };

export const PayeeStatus = [
  {
    key: 'Staked',
    name: 'Back to Staking',
  },
  {
    key: 'Stash',
    name: 'To Stash Account',
  },
  {
    key: 'Controller',
    name: 'To Controller Account',
  },
];

export const InterfaceMaximumWidth = 1550;
export const SideMenuMaximisedWidth = 185;
export const SideMenuMinimisedWidth = 75;
export const SideMenuStickyThreshold = 1175;
export const SectionFullWidthThreshold = 1050;
export const ShowAccountsButtonWidthThreshold = 850;
export const FloatingMenuWidth = 250;
export const SmallFontSizeMaxWidth = 600;
export const MediumFontSizeMaxWidth = 1600;
export const TipsThresholdSmall = 750;
export const TipsThresholdMedium = 1200;

/*
 * Toggle-able services
 */
export const SERVICES = ['cereStats'];

/*
 * Fallback config values
 */
export const MAX_NOMINATIONS = 16;
export const BONDING_DURATION = 3;
export const SESSIONS_PER_ERA = 6;
export const MAX_NOMINATOR_REWARDED_PER_VALIDATOR = 256;
export const VOTER_SNAPSHOT_PER_BLOCK = 22500;
export const MAX_ELECTING_VOTERS = 10000;
export const EXPECTED_BLOCK_TIME = 6000;

/*
 * Misc values
 */
export const ListItemsPerPage = 50;
export const ListItemsPerBatch = 30;
export const MinBondPrecision = 3;
export const MaxPayoutDays = 60;

/*
 * Third party API keys and endpoints
 */
export const ApiSubscanKey = 'd37149339f64775155a82a53f4253b27';
export const EndpointPrice = 'https://api.binance.com/api/v3';
export const ApiEndpoints = {
  priceChange: `${EndpointPrice}/ticker/24hr?symbol=`,
  subscanRewardSlash: '/api/v2/scan/account/reward_slash',
  subscanPoolRewards: '/api/scan/nomination_pool/rewards',
  subscanEraStat: '/api/scan/staking/era_stat',
};

/*
 * default network parameters
 */
export const DefaultParams = {
  auctionAdjust: 0,
  auctionMax: 0,
  falloff: 0.05,
  stakeTarget: 0.2,
  maxInflation: 0.05,
  minInflation: 0.0001,
};
