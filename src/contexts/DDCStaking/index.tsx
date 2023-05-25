// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useRef } from 'react';
import BN from 'bn.js';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import Worker from 'worker-loader!../../workers/stakers';
import { localStorageOrDefault, setStateWithRef } from 'Utils';
import { ExternalAccount, ImportedAccount } from 'contexts/Connect/types';
import { MaybeAccount } from 'types';
import {
  DDCEraStakers,
  DDCStakingContextInterface,
  DDCStakingMetrics,
  DDCStakingTargets,
} from './types';
import { useApi } from '../Api';
import { useConnect } from '../Connect';
import * as defaults from './defaults';
import { useDDCBalances } from '../DDCBalances/index';

export const DDCStakingContext =
  React.createContext<DDCStakingContextInterface>(
    defaults.defaultDDCStakingContext
  );

export const useDDCStaking = () => React.useContext(DDCStakingContext);

const worker = new Worker();

export const DDCStakingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    activeAccount,
    accounts: connectAccounts,
    getActiveAccount,
  } = useConnect();
  const { status } = useApi();
  const { getBondedAccount, getLedgerForStash } = useDDCBalances();

  // store staking metrics in state
  const [stakingMetrics, setStakingMetrics] = useState<DDCStakingMetrics>(
    defaults.ddcStakingMetrics
  );

  // store stakers metadata in state
  const [eraStakers, setEraStakers] = useState<DDCEraStakers>(
    defaults.eraStakers
  );
  const eraStakersRef = useRef(eraStakers);

  // flags whether erasStakers is resyncing
  const [erasStakersSyncing, setErasStakersSyncing] = useState(false);
  const erasStakersSyncingRef = useRef(erasStakersSyncing);

  // store account target validators
  const [targets, _setTargets] = useState<DDCStakingTargets>(
    localStorageOrDefault<DDCStakingTargets>(
      `${activeAccount ?? ''}_targets`,
      defaults.targets,
      true
    ) as DDCStakingTargets
  );

  useEffect(() => {
    if (status === 'connecting') {
      setStateWithRef(defaults.eraStakers, setEraStakers, eraStakersRef);
      setStakingMetrics(defaults.ddcStakingMetrics);
    }
  }, [status]);

  worker.onmessage = (message: MessageEvent) => {
    if (message) {
      const { data } = message;
      const {
        stakers,
        totalActiveNominators,
        activeValidators,
        minActiveBond,
        ownStake,
        _activeAccount,
      } = data;

      // finish sync
      setStateWithRef(false, setErasStakersSyncing, erasStakersSyncingRef);

      // check if account hasn't changed since worker started
      if (getActiveAccount() === _activeAccount) {
        setStateWithRef(
          {
            ...eraStakersRef.current,
            stakers,
            // nominators,
            totalActiveNominators,
            activeValidators,
            minActiveBond,
            ownStake,
          },
          setEraStakers,
          eraStakersRef
        );
      }
    }
  };

  /* Sets an account's stored target validators */
  const setTargets = (_targets: DDCStakingTargets) => {
    localStorage.setItem(`${activeAccount}_targets`, JSON.stringify(_targets));
    _setTargets(_targets);
    return [];
  };

  /*
   * Helper function to determine whether the active account
   * has set a controller account.
   */
  const hasController = () => {
    if (!activeAccount) {
      return false;
    }
    return getBondedAccount(activeAccount) !== null;
  };

  /*
   * Helper function to determine whether the controller account
   * has been imported.
   */
  const getControllerNotImported = (address: MaybeAccount) => {
    if (address === null || !activeAccount) {
      return false;
    }
    // check if controller is imported
    const exists = connectAccounts.find(
      (acc: ImportedAccount) => acc.address === address
    );
    if (exists === undefined) {
      return true;
    }

    if (Object.prototype.hasOwnProperty.call(exists, 'addedBy')) {
      const externalAccount = exists as ExternalAccount;
      if (externalAccount.addedBy === 'user') {
        return false;
      }
    }

    return !Object.prototype.hasOwnProperty.call(exists, 'signer');
  };

  /*
   * Helper function to determine whether the active account
   * is bonding, or is yet to start.
   */
  const isBonding = () => {
    if (!hasController() || !activeAccount) {
      return false;
    }

    const ledger = getLedgerForStash(activeAccount);
    return ledger.active.gt(new BN(0));
  };

  /*
   * Helper function to determine whether the active account
   * has funds unlocking.
   */
  const isUnlocking = () => {
    if (!hasController() || !activeAccount) {
      return false;
    }
    const ledger = getLedgerForStash(activeAccount);
    return ledger.unlocking.length;
  };

  /*
   * Helper function to determine whether the active account
   * is nominating, or is yet to start.
   */
  const inSetup = () => {
    return !activeAccount || (!hasController() && !isBonding());
  };

  return (
    <DDCStakingContext.Provider
      value={{
        setTargets,
        hasController,
        getControllerNotImported,
        isBonding,
        inSetup,
        staking: stakingMetrics,
        eraStakers: eraStakersRef.current,
        erasStakersSyncing: erasStakersSyncingRef.current,
        targets,
      }}
    >
      {children}
    </DDCStakingContext.Provider>
  );
};
