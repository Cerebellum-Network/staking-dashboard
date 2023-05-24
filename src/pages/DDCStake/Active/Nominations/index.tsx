// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useApi } from 'contexts/Api';
import { useValidators } from 'contexts/Validators';
import { ValidatorList } from 'library/ValidatorList';
import { OpenAssistantIcon } from 'library/OpenAssistantIcon';
import { Button } from 'library/Button';
import { useModal } from 'contexts/Modal';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useDDCStake } from 'contexts/DDCStakeUI';
import { useDDCStaking } from 'contexts/DDCStaking';
import { CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { useActivePool } from 'contexts/Pools/ActivePool';
import { Wrapper } from './Wrapper';

export const Nominations = ({ bondType }: { bondType: 'pool' | 'stake' }) => {
  const { openModalWith } = useModal();
  const { isReady } = useApi();
  const { inSetup } = useDDCStaking();
  const { isSyncing } = useDDCStake();
  const { activeAccount, isReadOnlyAccount } = useConnect();
  const { getAccountNominations } = useBalances();
  const { nominated: stakeNominated, poolNominated } = useValidators();
  let { favouritesList } = useValidators();
  if (favouritesList === null) {
    favouritesList = [];
  }

  const { poolNominations, isNominator: isPoolNominator } = useActivePool();

  const isPool = bondType === 'pool';
  const nominations = isPool
    ? poolNominations.targets
    : getAccountNominations(activeAccount);
  const nominated = isPool ? poolNominated : stakeNominated;
  const batchKey = isPool ? 'pool_nominations' : 'stake_nominations';

  // callback function to stop nominating selected validators
  const cbStopNominatingSelected = (provider: any) => {
    const { selected } = provider;
    const _nominations = [...nominations].filter((n) => {
      return !selected.map((_s: any) => _s.address).includes(n);
    });
    openModalWith(
      'ChangeNominations',
      {
        nominations: _nominations,
        provider,
        bondType,
      },
      'small'
    );
  };

  // callback function for adding nominations
  const cbAddNominations = ({ setSelectActive }: any) => {
    setSelectActive(false);
    openModalWith(
      'NominateFromFavourites',
      {
        nominations,
        bondType,
      },
      'large'
    );
  };

  return (
    <Wrapper>
      <CardHeaderWrapper withAction>
        <h3>
          {isPool ? 'Pool Nominations' : 'Nominations'}
          <OpenAssistantIcon page="stake" title="Nominations" />
        </h3>
        <div>
          {!isPool && nominations.length ? (
            <div>
              <Button
                small
                icon={faStopCircle}
                transform="grow-1"
                inline
                primary
                title="Stop"
                disabled={
                  (!isPool && inSetup()) ||
                  isSyncing ||
                  isReadOnlyAccount(activeAccount)
                }
                onClick={() =>
                  openModalWith(
                    'ChangeNominations',
                    {
                      nominations: [],
                      bondType,
                    },
                    'small'
                  )
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardHeaderWrapper>
      {!activeAccount ? (
        <div className="head">
          <h4>Not Nominating.</h4>
        </div>
      ) : nominated === null || isSyncing ? (
        <div className="head">
          <h4>Syncing nominations...</h4>
        </div>
      ) : (
        <>
          {isReady && (
            <>
              {nominated.length > 0 ? (
                <div style={{ marginTop: '1rem' }}>
                  <ValidatorList
                    validators={nominated}
                    batchKey={batchKey}
                    title="Your Nominations"
                    format="nomination"
                    bondType={isPool ? 'pool' : 'stake'}
                    selectable={
                      !isReadOnlyAccount(activeAccount) &&
                      (!isPool || isPoolNominator())
                    }
                    actions={
                      isReadOnlyAccount(activeAccount)
                        ? []
                        : [
                            {
                              title: 'Stop Nominating Selected',
                              onClick: cbStopNominatingSelected,
                              onSelected: true,
                            },
                            {
                              disabled: !favouritesList.length,
                              title: 'Add From Favourites',
                              onClick: cbAddNominations,
                              onSelected: false,
                            },
                          ]
                    }
                    refetchOnListUpdate
                    allowMoreCols
                    disableThrottle
                  />
                </div>
              ) : (
                <div className="head">
                  <h4>Not Nominating.</h4>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Nominations;
