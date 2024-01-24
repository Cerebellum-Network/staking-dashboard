// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { LedgerApp } from 'contexts/Hardware/Ledger/types';
import { NetworkName } from 'types';
import CereSVG from 'img/cere_logo.svg?react';

export const LedgerApps: LedgerApp[] = [
  {
    network: NetworkName.Cere,
    appName: 'Cere Netowrk',
    Icon: CereSVG,
  },
];
