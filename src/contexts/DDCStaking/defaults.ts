// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import {
  DDCStakingMetrics,
  DDCEraStakers,
  DDCStakingTargets,
  DDCStakingContextInterface,
} from './types';

export const ddcStakingMetrics: DDCStakingMetrics = {
  totalNominators: new BN(0),
  totalValidators: new BN(0),
  lastReward: new BN(0),
  lastTotalStake: new BN(0),
  validatorCount: new BN(0),
  maxNominatorsCount: new BN(0),
  maxValidatorsCount: new BN(0),
  minNominatorBond: new BN(0),
  historyDepth: new BN(0),
  payee: null,
  unsub: null,
};

export const eraStakers: DDCEraStakers = {
  stakers: [],
  totalActiveNominators: 0,
  activeValidators: 0,
  minActiveBond: 0,
  minStakingActiveBond: 0,
  ownStake: 0,
};

export const targets: DDCStakingTargets = {
  nominations: [],
};

export const defaultDDCStakingContext: DDCStakingContextInterface = {
  // eslint-disable-next-line
  setTargets: (t) => {},
  hasController: () => false,
  // eslint-disable-next-line
  getControllerNotImported: (a) => null,
  isBonding: () => false,
  inSetup: () => true,
  staking: ddcStakingMetrics,
  eraStakers,
  targets,
  erasStakersSyncing: true,
};
