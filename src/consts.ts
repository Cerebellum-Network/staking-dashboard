// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

/*
 * Global Constants
 */
export const AppVersion = '1.0.1';
export const UriPrefix = '';
export const TitleDefault = 'Cere Staking Dashboard';
export const DappName = 'cere_staking_dashboard';
export const CereUrl = 'https://cere.network';

export const DefaultNetwork = 'cereMainnet';

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
export const ServiceList = ['cereStats'];

/*
 * Fallback config values
 */
export const FallbackMaxNominations = 16;
export const FallbackBondingDuration = 3;
export const FallbackSessionsPerEra = 6;
export const FallbackNominatorRewardedPerValidator = 256;
export const FallbackMaxElectingVoters = 10000;
export const FallbackExpectedBlockTime = 6000;

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

/*
 * locale
 */
export const DefaultLocale = 'en';
