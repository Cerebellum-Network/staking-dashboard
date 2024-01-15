// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { MaybeAccount } from 'types';

export interface BlockedProps {
  prefs: any;
}

export interface CopyAddressProps {
  validator: any;
}

export interface FavouriteProps {
  address: any;
}

export interface IdentityProps {
  validator: any;
  batchIndex: number;
  batchKey: string;
}

export interface MetricsProps {
  display: any;
  address: string;
}

export interface NominationStatusProps {
  address: string;
  bondType: string;
}

export interface OversubscribedProps {
  batchIndex: number;
  batchKey: string;
}

export interface SelectProps {
  validator: any;
}

export interface NominationProps {
  validator: any;
  nominator: MaybeAccount;
  toggleFavorites: boolean;
  batchIndex: number;
  batchKey: string;
  bondType: string;
  inModal: boolean;
}

export interface DefaultProps {
  validator: any;
  toggleFavorites: boolean;
  batchIndex: number;
  batchKey: string;
  showMenu: boolean;
  inModal: boolean;
}
