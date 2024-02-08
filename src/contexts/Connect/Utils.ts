// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import Keyring from '@polkadot/keyring';
import { localStorageOrDefault } from '@polkadot-cloud/utils';
import type { NetworkName } from 'types';

// Gets local `activeAccount` for a network.
export const getActiveAccountLocal = (network: NetworkName, ss58: number) => {
  const keyring = new Keyring();
  keyring.setSS58Format(ss58);
  let account = localStorageOrDefault(`${network}_active_account`, null);
  if (account !== null) {
    account = keyring.addFromAddress(account).address;
  }
  return account;
};

// Formats an address with the supplied ss58 prefix.
export const formatAccountSs58 = (address: string, ss58: number) => {
  try {
    const keyring = new Keyring();
    keyring.setSS58Format(ss58);
    const formatted = keyring.addFromAddress(address).address;
    if (formatted !== address) {
      return formatted;
    }

    return null;
  } catch (e) {
    return null;
  }
};

// account utils

// gets local `activeAccount` for a network
export const getActiveAccountLocal = (network: Network) => {
  const keyring = new Keyring();
  keyring.setSS58Format(network.ss58);
  let _activeAccount = localStorageOrDefault(
    `${network.name.toLowerCase()}_active_account`,
    null
  );
  if (_activeAccount !== null) {
    _activeAccount = keyring.addFromAddress(_activeAccount).address;
  }
  return _activeAccount;
};

// gets local external accounts, formatting their addresses
// using active network ss58 format.
export const getLocalExternalAccounts = (
  network: Network,
  activeNetworkOnly = false
) => {
  let localExternalAccounts = localStorageOrDefault<Array<ExternalAccount>>(
    'external_accounts',
    [],
    true
  ) as Array<ExternalAccount>;
  if (activeNetworkOnly) {
    localExternalAccounts = localExternalAccounts.filter(
      (l: ExternalAccount) => l.network === network.name
    );
  }
  return localExternalAccounts;
};

// gets accounts that exist in local `external_accounts`
export const getInExternalAccounts = (
  accounts: Array<ExtensionAccount>,
  network: Network
) => {
  const localExternalAccounts = getLocalExternalAccounts(network, true);
  return (
    localExternalAccounts.filter(
      (l: ExternalAccount) =>
        (accounts || []).find(
          (a: ExtensionAccount) => a.address === l.address
        ) !== undefined && l.addedBy === 'system'
    ) || []
  );
};

// removes supplied accounts from local `external_accounts`.
export const removeLocalExternalAccounts = (
  network: Network,
  accounts: Array<ExternalAccount>
) => {
  let localExternalAccounts = getLocalExternalAccounts(network, true);
  localExternalAccounts = localExternalAccounts.filter(
    (l: ExternalAccount) =>
      accounts.find(
        (a: ImportedAccount) =>
          a.address === l.address && l.network === network.name
      ) === undefined
  );
  localStorage.setItem(
    'external_accounts',
    JSON.stringify(localExternalAccounts)
  );
};
