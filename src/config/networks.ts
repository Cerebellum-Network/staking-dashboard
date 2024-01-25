// SPDX-License-Identifier: Apache-2.0
import * as Sc from '@substrate/connect';
import { DefaultParams } from 'consts';
import CereIconSvg from 'img/cere_icon.svg?react';
import CereLogoSvg from 'img/cere_logo.svg?react';
import type { Networks, NetworkName, Network } from 'types';
import BigNumber from 'bignumber.js';

export const NetworksWithPagedRewards: NetworkName[] = ['Cere'];
export const PagedRewardsStartEra: Record<NetworkName, BigNumber | null> = {
  Cere: null,
  'Cere Testnet': null,
  'Cere Devnet': null,
  'Cere Qanet': null,
};

const cereMainnet: Network = {
  name: 'Cere',
  namespace: '91b171bb158e2d3848fa23a9f1c25182',
  colors: {
    primary: {
      light: '#1D1B20',
      dark: 'rgb(183, 174, 255)',
    },
    secondary: {
      light: '#Ec8f6e',
      dark: '#Ec8f6e',
    },
    stroke: {
      light: 'rgb(236, 110, 121)',
      dark: 'rgb(183, 174, 255)',
    },
    transparent: {
      light: 'rgb(236,110,121,0.05)',
      dark: 'rgb(236,110,121, 0.05)',
    },
    pending: {
      light: 'rgb(236,110,121,0.33)',
      dark: 'rgb(236,110,121,0.33)',
    },
  },
  endpoints: {
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: { Cere: 'wss://archive.mainnet.cere.network/ws' },
    lightClient: Sc.WellKnownChain.polkadot,
  },
  subscanEndpoint: '',
  cereStatsEndpoint: 'wss://hasura.stats.cere.network/v1/graphql',
  unit: 'CERE',
  units: 10,
  ss58: 54,
  // It's a draft icons set
  brand: {
    icon: CereIconSvg,
    token: CereIconSvg, // ToDo
    logo: {
      svg: CereLogoSvg,
      width: '8.5rem',
    },
    inline: {
      svg: CereIconSvg,
      size: '1.15rem',
    },
  },
  api: {
    unit: 'CERE',
    priceTicker: 'CEREUSDT',
  },
  params: DefaultParams,
  defaultFeeReserve: 0.1,
  maxExposurePageSize: new BigNumber(512),
};

const cereTestnet: Network = {
  ...cereMainnet,
  name: 'Cere Testnet',
  endpoints: {
    defaultRpcEndpoint: 'CereTesnet',
    rpcEndpoints: { CereTestnet: 'wss://archive.testnet.cere.network/ws' },
    lightClient: Sc.WellKnownChain.polkadot,
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

const cereDevnet: Network = {
  ...cereMainnet,
  name: 'Cere Devnet',
  endpoints: {
    defaultRpcEndpoint: 'CereDevnet',
    rpcEndpoints: { CereDevnet: 'wss://archive.devnet.cere.network/ws' },
    lightClient: Sc.WellKnownChain.polkadot,
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

const cereQAnet: Network = {
  ...cereMainnet,
  name: 'Cere Qanet',
  endpoints: {
    defaultRpcEndpoint: 'CereDevnet',
    rpcEndpoints: { CereQanet: 'wss://archive.qanet.cere.network/ws' },
    lightClient: Sc.WellKnownChain.polkadot,
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

// Determine if the testnet should be included based on the REACT_APP_INCLUDE_TESTNET environment variable
// By default, includeTestnet is true or undefined unless REACT_APP_INCLUDE_TESTNET is explicitly set to 'false'
// const includeTestnet = process.env.REACT_APP_INCLUDE_TESTNET !== 'false'; // ToDo
const includeTestnet = 'true';

/*
 * Network Configuration
 */
export const NetworkList: Networks = {
  cereMainnet,
  ...(includeTestnet ? { cereTestnet } : {}),
  cereDevnet,
  cereQAnet,
};
