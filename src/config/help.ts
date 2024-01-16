// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HelpContentRaw } from 'contexts/Help/types';

export const HELP_CONFIG: HelpContentRaw = [
  {
    key: 'overview',
    definitions: [
      {
        title: 'Dashboard Tips',
        description: [
          'Staking dashboard will present you tips to help you along each step of staking on Polkadot.',
          'Tips can be turned off or re-enabled from dashboard settings, that can be accessed via the cog icon in the bottom left corner of the side menu.',
        ],
      },
      {
        title: 'Supply Staked',
        description: [
          'The current cumulative supply of {NETWORK_UNIT} being staked globally.',
          'The percentage of staked {NETWORK_UNIT} is relative to the total supply of {NETWORK_UNIT}.',
        ],
      },
      {
        title: 'Total Nominators',
        description: [
          'Accounts who are staking in the network, regardless of whether they are active or inactive in the current session.',
          'In order to stake {NETWORK_UNIT}, you must be a nominator.',
        ],
      },
      {
        title: 'Active Nominators',
        description: [
          'Nominators who are active in the current session.',
          'Being an active nominator does not guarantee rewards, as your nominees may be oversubscribed.',
        ],
      },
      {
        title: 'Your Balance',
        description: [
          'Your balance represents the total {NETWORK_UNIT} you have available in addition to your total staked amount, that includes the amount you have bonded in a Pool.',
          'Unlike your staked balance, your bonded pool balance is held and locked in the pool itself.',
        ],
      },
      {
        title: 'Reserve Balance',
        description: [
          'In {NETWORK_NAME}, you must have a balance above a certain amount for your account to exist on-chain. This amount is called your "existential deposit".',
          'Staking dashboard ensures that this amount of {NETWORK_UNIT} is never touched.',
        ],
      },
      {
        title: 'Network Stats',
        description: [
          'Real time network statistics that may affect your staking positions.',
          'Keep up to date on the state of the network from your overview.',
        ],
      },
      {
        title: 'Inflation',
        description: [
          'CERE is inflationary; there is no maximum number of CERE.',
          'Inflation is designed to be in the range of 0.01% to 5% annually, with validator rewards being a function of the amount staked and the remainder going to treasury.',
        ],
      },
      {
        title: 'Historical Rewards Rate',
        description: [
          'An estimated annual yield based on the {NETWORK_NAME} reward distribution model.',
        ],
      },
      {
        title: 'Ideal Staked',
        description: [
          'The percentage of staked total supply in ideal network conditions.',
        ],
      },
    ],
    external: [
      {
        title: 'How to Connect Your Accounts',
        url: 'https://support.polkadot.network/support/solutions/articles/65000182121-how-to-use-the-staking-dashboard-connecting-your-account',
        website: 'polkadot.network',
      },
      {
        title: 'How to Use the Staking Dashboard: Overview',
        url: 'https://support.polkadot.network/support/solutions/articles/65000182104-how-to-use-the-staking-dashboard-overview',
        website: 'polkadot.network',
      },
      {
        title: 'Staking your DOT',
        url: 'https://support.polkadot.network/support/solutions/articles/65000182104-how-to-use-the-staking-dashboard-overview',
        website: 'polkadot.network',
      },
    ],
  },
  {
    key: 'nominate',
    definitions: [
      'Nomination Status',
      'Stash and Controller Accounts',
      'Controller Account Eligibility',
      'Bonding',
      'Active Bond Threshold',
      'Reward Destination',
      'Nominating',
      'Nominations',
      'Inactive Nominations',
    ],
    external: [
      [
        'change_destination',
        'https://support.polkadot.network/support/solutions/articles/65000182220-how-to-use-the-staking-dashboard-changing-reward-destination',
        'polkadot.network',
      ],
      [
        'bond_more',
        'https://support.polkadot.network/support/solutions/articles/65000182207-how-to-use-the-staking-dashboard-bond-more-tokens-to-your-existing-stake',
        'polkadot.network',
      ],
      [
        'unbonding_tokens',
        'https://support.polkadot.network/support/solutions/articles/65000182201-how-to-use-the-staking-dashboard-unbonding-your-tokens',
        'polkadot.network',
      ],
      [
        'rebonding',
        'https://support.polkadot.network/support/solutions/articles/65000182221-how-to-use-the-staking-dashboard-rebonding',
        'polkadot.network',
      ],
      [
        'change_account',
        'https://support.polkadot.network/support/solutions/articles/65000182218-how-to-use-the-staking-dashboard-changing-your-controller-account',
        'polkadot.network',
      ],
      [
        'change_nominations',
        'https://support.polkadot.network/support/solutions/articles/65000182518-how-to-use-the-staking-dashboard-changing-your-nominations',
        'polkadot.network',
      ],
    ],
  },
  {
    key: 'pools',
    definitions: [
      'Nomination Pools',
      'Active Pools',
      'Minimum Join Bond',
      'Minimum Create Bond',
      'Pool Membership',
      'Bonded in Pool',
      'Pool Rewards',
      'Pool Roles',
    ],
    external: [
      [
        'create_pools',
        'https://support.polkadot.network/support/solutions/articles/65000182388-how-to-use-the-staking-dashboard-creating-nomination-pools',
        'polkadot.network',
      ],
      [
        'claim_rewards',
        'https://support.polkadot.network/support/solutions/articles/65000182399-how-to-use-staking-dashboard-claiming-nomination-pool-rewards',
        'polkadot.network',
      ],
    ],
  },
  {
    key: 'validators',
    definitions: [
      'Validator',
      'Active Validator',
      'Average Commission',
      'Era',
      'Epoch',
      'Era Points',
      'Self Stake',
      'Nominator Stake',
      'Commission',
      'Over Subscribed',
      'Blocked Nominations',
    ],
    external: [
      [
        'choose_validators',
        'https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-',
        'polkadot.network',
      ],
    ],
  },
  {
    key: 'payouts',
    definitions: ['Payout', 'Last Era Payout', 'Payout History'],
    external: [],
  },
  {
    key: 'community',
    definitions: [],
    external: [],
  },
];
