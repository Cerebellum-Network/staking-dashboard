// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  faRedoAlt,
  faWallet,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Separator } from 'Wrappers';
import { CardWrapper } from 'library/Graphs/Wrappers';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { PAYEE_STATUS } from 'consts';
import { useDDCStake } from 'contexts/DDCStakeUI';
import { useApi } from 'contexts/Api';
import Stat from 'library/Stat';
import { useDDCStaking } from 'contexts/DDCStaking';

export const Status = ({ height }: { height: number }) => {
  const { isReady } = useApi();
  const { setOnSetup, getSetupProgressPercent }: any = useDDCStake();
  const { openModalWith } = useModal();
  const { activeAccount, isReadOnlyAccount } = useConnect();
  const { isSyncing } = useDDCStake();
  const { staking, inSetup } = useDDCStaking();
  const { payee } = staking;

  const payeeStatus = PAYEE_STATUS.find((item) => item.key === payee);

  let startTitle = 'Start Staking';
  if (inSetup()) {
    const progress = getSetupProgressPercent(activeAccount);
    if (progress > 0) {
      startTitle += `: ${progress}%`;
    }
  }
  return (
    <CardWrapper height={height}>
      <Stat
        label="Status"
        assistant={['stake', 'Staking Status']}
        stat={inSetup() || isSyncing ? 'Not Staking' : 'Staking'}
        buttons={
          !inSetup()
            ? []
            : [
                {
                  title: startTitle,
                  icon: faChevronCircleRight,
                  transform: 'grow-1',
                  disabled:
                    !isReady ||
                    isReadOnlyAccount(activeAccount) ||
                    !activeAccount,
                  onClick: () => setOnSetup(true),
                },
              ]
        }
      />
      <Separator />
      <Stat
        label="Reward Destination"
        assistant={['stake', 'Reward Destination']}
        icon={
          (payee === null
            ? faCircle
            : payee === 'Staked'
            ? faRedoAlt
            : payee === 'None'
            ? faCircle
            : faWallet) as IconProp
        }
        stat={inSetup() ? 'Not Assigned' : payeeStatus?.name ?? 'Not Assigned'}
        buttons={
          payeeStatus
            ? [
                {
                  title: 'Update',
                  icon: faWallet,
                  small: true,
                  disabled:
                    inSetup() || isSyncing || isReadOnlyAccount(activeAccount),
                  onClick: () => openModalWith('UpdatePayee', {}, 'small'),
                },
              ]
            : []
        }
      />
    </CardWrapper>
  );
};

export default Status;
