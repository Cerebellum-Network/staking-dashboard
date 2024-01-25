// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { LedgerApp } from 'contexts/Hardware/Ledger/types';
import CereSVG from 'img/cere_logo.svg?react';

export const LedgerApps: LedgerApp[] = [
  {
    network: 'Cere',
    appName: 'Cere Netowrk',
    Icon: CereSVG,
  },
];
