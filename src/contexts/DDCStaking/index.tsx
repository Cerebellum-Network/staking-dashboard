// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useRef } from 'react';
import BN from 'bn.js';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import Worker from 'worker-loader!../../workers/stakers';
import {
  rmCommas,
  localStorageOrDefault,
  setStateWithRef,
  planckBnToUnit,
} from 'Utils';
import { ExternalAccount, ImportedAccount } from 'contexts/Connect/types';
import { AnyApi, MaybeAccount } from 'types';
import {
  DDCEraStakers,
  DDCNominationStatuses,
  DDCStakingContextInterface,
  DDCStakingMetrics,
  DDCStakingTargets,
} from './types';
import { useApi } from '../Api';
import { useNetworkMetrics } from '../Network';
import { useConnect } from '../Connect';
import * as defaults from './defaults';
import { useDDCBalances } from '../DDCBalances';

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
  const { isReady, api, consts, status, network } = useApi();
  const { metrics } = useNetworkMetrics();
  const {
    accounts,
    getBondedAccount,
    getLedgerForStash,
    getAccountNominations,
  } = useDDCBalances();
  const { units } = network;

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

  // handle staking metrics subscription
  useEffect(() => {
    if (isReady) {
      subscribeToStakingkMetrics();
    }
    return () => {
      // unsubscribe from staking metrics
      if (stakingMetrics.unsub !== null) {
        stakingMetrics.unsub();
      }
    };
  }, [isReady, metrics.activeEra]);

  useEffect(() => {
    if (activeAccount) {
      // calculates minimum bond of the user's chosen nominated validators.
      let _stakingMinActiveBond = new BN(0);

      const stakers = eraStakersRef.current?.stakers ?? null;
      const nominations = getAccountNominations(activeAccount);

      if (nominations.length && stakers !== null) {
        for (const n of nominations) {
          const staker = stakers.find((item) => item.address === n);

          if (staker !== undefined) {
            let { others } = staker;

            // order others by bonded value, largest first.
            others = others.sort((a: any, b: any) => {
              const x = new BN(rmCommas(a.value));
              const y = new BN(rmCommas(b.value));
              return y.sub(x);
            });

            if (others.length) {
              const _minActive = new BN(rmCommas(others[0].value.toString()));
              // set new minimum active bond if less than current value
              if (
                _minActive.lt(_stakingMinActiveBond) ||
                _stakingMinActiveBond !== new BN(0)
              ) {
                _stakingMinActiveBond = _minActive;
              }
            }
          }
        }
      }

      // convert _stakingMinActiveBond to base value
      const stakingMinActiveBond = planckBnToUnit(_stakingMinActiveBond, units);

      setStateWithRef(
        {
          ...eraStakersRef.current,
          minStakingActiveBond: stakingMinActiveBond,
        },
        setEraStakers,
        eraStakersRef
      );

      // set account's targets
      _setTargets(
        localStorageOrDefault(
          `${activeAccount}_targets`,
          defaults.targets,
          true
        ) as DDCStakingTargets
      );
    }
  }, [isReady, accounts, activeAccount, eraStakersRef.current?.stakers]);

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

  const subscribeToStakingkMetrics = async () => {
    if (api !== null && isReady && metrics.activeEra.index !== 0) {
      const previousEra = metrics.activeEra.index - 1;

      // subscribe to staking metrics
      const unsub = await api.queryMulti<AnyApi>(
        [
          api.query.ddcStaking.counterForNominators,
          api.query.ddcStaking.counterForValidators,
          api.query.ddcStaking.maxNominatorsCount,
          api.query.ddcStaking.maxValidatorsCount,
          api.query.ddcStaking.validatorCount,
          [api.query.ddcStaking.erasValidatorReward, previousEra],
          [api.query.ddcStaking.erasTotalStake, previousEra],
          api.query.ddcStaking.minNominatorBond,
          api.query.ddcStaking.historyDepth,
          [api.query.ddcStaking.payee, activeAccount],
        ],
        ([
          _totalNominators,
          _totalValidators,
          _maxNominatorsCount,
          _maxValidatorsCount,
          _validatorCount,
          _lastReward,
          _lastTotalStake,
          _minNominatorBond,
          _historyDepth,
          _payee,
        ]) => {
          setStakingMetrics({
            ...stakingMetrics,
            payee: _payee.toHuman(),
            historyDepth: _historyDepth.toBn(),
            lastTotalStake: _lastTotalStake.toBn(),
            validatorCount: _validatorCount.toBn(),
            totalNominators: _totalNominators.toBn(),
            totalValidators: _totalValidators.toBn(),
            minNominatorBond: _minNominatorBond.toBn(),
            lastReward: _lastReward.unwrapOrDefault(new BN(0)),
            maxValidatorsCount: new BN(_maxValidatorsCount.toString()),
            maxNominatorsCount: new BN(_maxNominatorsCount.toString()),
          });
        }
      );

      setStakingMetrics({
        ...stakingMetrics,
        unsub,
      });
    }
  };

  /*
   * Get the status of nominations.
   * Possible statuses: waiting, inactive, active.
   */
  const getNominationsStatus = () => {
    if (inSetup()) {
      return defaults.ddcNominationStatus;
    }
    if (!activeAccount) {
      return defaults.ddcNominationStatus;
    }
    const nominations = getAccountNominations(activeAccount);
    const statuses: DDCNominationStatuses = {};

    for (const nomination of nominations) {
      const s = eraStakersRef.current.stakers.find(
        (_n) => _n.address === nomination
      );

      if (s === undefined) {
        statuses[nomination] = 'waiting';
        continue;
      }
      const exists = (s.others ?? []).find(
        (_o: any) => _o.who === activeAccount
      );
      if (exists === undefined) {
        statuses[nomination] = 'inactive';
        continue;
      }
      statuses[nomination] = 'active';
    }

    return statuses;
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
  const isNominating = () => {
    if (!activeAccount) {
      return false;
    }
    const nominations = getAccountNominations(activeAccount);
    return nominations.length > 0;
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
        getNominationsStatus,
        setTargets,
        hasController,
        getControllerNotImported,
        isBonding,
        isNominating,
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
