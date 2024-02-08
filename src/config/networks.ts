// SPDX-License-Identifier: Apache-2.0
import { DefaultParams } from 'consts';
import CereIconSvg from 'img/cere_icon.svg?react';
import CereLogoSvg from 'img/cere_logo.svg?react';
import type { NetworkName, Networks } from 'types';
import BigNumber from 'bignumber.js';

const CereMainnet: NetworkName = 'Cere';
const CereTestnet: NetworkName = 'Cere Testnet';
const CereDevnet: NetworkName = 'Cere Devnet';
const CereQanet: NetworkName = 'Cere Qanet';
const polkadotNetwork: NetworkName = 'polkadot';
const kusamaNetwork: NetworkName = 'kusama';
const westendNetwork: NetworkName = 'westend';

const cereMainnet = {
  name: CereMainnet,
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
      dark: 'rgb(236,110,121,0.05)',
    },
    pending: {
      light: 'rgb(236,110,121,0.33)',
      dark: 'rgb(236,110,121,0.33))',
    },
  },
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.mainnet.cere.network/ws',
    },
  },
  subscanEndpoint: '',
  cereStatsEndpoint: 'wss://hasura.stats.cere.network/v1/graphql',
  unit: 'CERE',
  units: 10,
  ss58: 54,
  // It's a draft icons set
  brand: {
    icon: CereIconSvg,
    token: CereIconSvg,
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
  features: {
    pools: false,
  },
  params: {
    ...DefaultParams,
    stakeTarget: 0.75,
  },
  defaultFeeReserve: 0.1,
  maxExposurePageSize: new BigNumber(512),
};

const cereTestnet = {
  ...cereMainnet,
  name: CereTestnet,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.testnet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

const cereDevnet = {
  ...cereMainnet,
  name: CereDevnet,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.devnet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

const cereQAnet = {
  ...cereMainnet,
  name: CereQanet,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.qanet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

// ToDo Remove
const polkadot = {
  ...cereMainnet,
  name: polkadotNetwork,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.qanet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};
const kusama = {
  ...cereMainnet,
  name: kusamaNetwork,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.qanet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};
const westend = {
  ...cereMainnet,
  name: westendNetwork,
  endpoints: {
    lightClient: 'Cere',
    defaultRpcEndpoint: 'Cere',
    rpcEndpoints: {
      Cere: 'wss://archive.qanet.cere.network/ws',
    },
  },
  cereStatsEndpoint: 'wss://stats-hasura.network-dev.aws.cere.io/v1/graphql',
};

// Determine if the testnet should be included based on the REACT_APP_INCLUDE_TESTNET environment variable
// By default, includeTestnet is true or undefined unless REACT_APP_INCLUDE_TESTNET is explicitly set to 'false'
const includeTestnet = process.env.REACT_APP_INCLUDE_TESTNET !== 'false';

/*
 * Network Configuration
 */
export const NetworkList: Networks = {
  cereMainnet,
  ...(includeTestnet ? { cereTestnet } : {}),
  cereDevnet,
  cereQAnet,
  polkadot,
  kusama,
  westend,
};

// DEPRECATION: Paged Rewards
//
// Temporary until paged rewards migration has completed on all networks.
export const NetworksWithPagedRewards: NetworkName[] = ['westend'];
export const PagedRewardsStartEra: Record<NetworkName, BigNumber | null> = {
  polkadot: null,
  kusama: null,
  westend: new BigNumber(7167),
  Cere: null,
  'Cere Devnet': null,
  'Cere Testnet': null,
  'Cere Qanet': null,
};
