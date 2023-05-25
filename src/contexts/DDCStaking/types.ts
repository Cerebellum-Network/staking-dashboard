// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import { MaybeAccount } from 'types';

export interface DDCStakingMetrics {
  totalNominators: BN;
  totalValidators: BN;
  lastReward: BN;
  lastTotalStake: BN;
  validatorCount: BN;
  maxNominatorsCount: BN;
  maxValidatorsCount: BN;
  minNominatorBond: BN;
  historyDepth: BN;
  payee: string | null;
  unsub: { (): void } | null;
}

export interface DDCEraStakers {
  stakers: Array<any>;
  totalActiveNominators: number;
  activeValidators: number;
  minActiveBond: number;
  minStakingActiveBond: number;
  ownStake: any;
}

export type DDCNominationStatuses = { [key: string]: string };

export interface DDCStakingTargets {
  nominations: string[];
}

export interface DDCStakingContextInterface {
  setTargets: (t: any) => any;
  hasController: () => boolean;
  getControllerNotImported: (a: MaybeAccount) => any;
  isBonding: () => boolean;
  inSetup: () => any;
  staking: DDCStakingMetrics;
  eraStakers: DDCEraStakers;
  targets: any;
  erasStakersSyncing: any;
}
