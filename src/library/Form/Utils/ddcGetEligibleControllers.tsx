// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { useApi } from 'contexts/Api';
import { useDDCBalances } from 'contexts/DDCBalances';
import { ImportedAccount } from 'contexts/Connect/types';
import { planckBnToUnit } from 'Utils';
import { useConnect } from 'contexts/Connect';
import { InputItem } from '../types';

export const ddcGetEligibleControllers = (): Array<InputItem> => {
  const { network } = useApi();
  const { activeAccount, accounts: connectAccounts } = useConnect();
  const { isController, minReserve, getBondOptions } = useDDCBalances();

  const [accounts, setAccounts] = useState<Array<InputItem>>([]);

  useEffect(() => {
    setAccounts(filterAccounts());
  }, [activeAccount, connectAccounts]);

  const filterAccounts = () => {
    // remove read only accounts
    let _accounts = connectAccounts.filter((acc: ImportedAccount) => {
      return acc?.source !== 'external';
    });
    // filter items that are already controller accounts
    _accounts = _accounts.filter((acc: ImportedAccount) => {
      return !isController(acc?.address ?? null);
    });

    // remove active account from eligible accounts
    _accounts = _accounts.filter(
      (acc: ImportedAccount) => acc.address !== activeAccount
    );

    // inject balances and whether account can be an active item
    const _accountsAsInput: Array<InputItem> = _accounts.map(
      (acc: ImportedAccount) => {
        const bondOptions = getBondOptions(acc?.address ?? null);
        return {
          ...acc,
          bondOptions,
          active:
            planckBnToUnit(bondOptions.freeToBond, network.units) >=
            planckBnToUnit(minReserve, network.units),
          alert: `Not Enough ${network.unit}`,
        };
      }
    );

    return _accountsAsInput;
  };

  return accounts;
};
