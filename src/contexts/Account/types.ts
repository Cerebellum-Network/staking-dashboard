// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyMetaBatch } from 'types';

export interface AccountContextInterface {
  fetchAccountMetaBatch: (k: string, v: string[], r?: boolean) => void;
  meta: AnyMetaBatch;
}
