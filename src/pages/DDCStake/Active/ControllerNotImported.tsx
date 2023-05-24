// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CardWrapper, CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { Button } from 'library/Button';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useDDCStaking } from 'contexts/DDCStaking';
import { PageRowWrapper } from 'Wrappers';
import { useModal } from 'contexts/Modal';
import { useDDCStake } from 'contexts/DDCStakeUI';

export const ControllerNotImported = () => {
  const { openModalWith } = useModal();
  const { isSyncing } = useDDCStake();
  const { getControllerNotImported } = useDDCStaking();
  const { activeAccount, isReadOnlyAccount } = useConnect();
  const { getBondedAccount } = useBalances();
  const controller = getBondedAccount(activeAccount);

  return (
    <>
      {getControllerNotImported(controller) &&
        !isSyncing &&
        !isReadOnlyAccount(activeAccount) && (
          <PageRowWrapper className="page-padding" noVerticalSpacer>
            <CardWrapper
              style={{ border: '2px solid rgba(242, 185, 27,0.25)' }}
            >
              <CardHeaderWrapper>
                <h4>
                  You have not imported your controller account. If you have
                  lost access to your controller account, set a new one now.
                  Otherwise, import the controller into one of your active
                  extensions.
                </h4>
              </CardHeaderWrapper>
              <Button
                small
                primary
                inline
                title="Set New Controller"
                onClick={() => openModalWith('UpdateController', {}, 'large')}
              />
            </CardWrapper>
          </PageRowWrapper>
        )}
    </>
  );
};
