// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  PageRowWrapper,
  RowPrimaryWrapper,
  RowSecondaryWrapper,
} from 'Wrappers';
import { CardWrapper, CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { StatBoxList } from 'library/StatBoxList';
import { useDDCStaking } from 'contexts/DDCStaking';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { Button } from 'library/Button';
import { PageTitle } from 'library/PageTitle';
import { OpenAssistantIcon } from 'library/OpenAssistantIcon';
import { useModal } from 'contexts/Modal';
import { useDDCStake } from 'contexts/DDCStakeUI';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import {
  SECTION_FULL_WIDTH_THRESHOLD,
  SIDE_MENU_STICKY_THRESHOLD,
} from 'consts';
import { Nominations } from './Nominations';
import { ManageBond } from './ManageBond';
import { GenerateNominations } from '../GenerateNominations';
import ActiveNominationsStatBox from './Stats/ActiveNominations';
import InacctiveNominationsStatBox from './Stats/InactiveNominations';
import MinimumActiveBondStatBox from './Stats/MinimumActiveBond';
import { ControllerNotImported } from './ControllerNotImported';
import { Status } from './Status';

export const Active = ({ title }: any) => {
  const { openModalWith } = useModal();
  const { activeAccount } = useConnect();
  const { isSyncing } = useDDCStake();
  const { targets, setTargets, inSetup } = useDDCStaking();
  const { getAccountNominations } = useBalances();
  const nominations = getAccountNominations(activeAccount);

  const ROW_HEIGHT = 290;

  return (
    <>
      <PageTitle title={title} />
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <RowPrimaryWrapper
          hOrder={1}
          vOrder={0}
          thresholdStickyMenu={SIDE_MENU_STICKY_THRESHOLD}
          thresholdFullWidth={SECTION_FULL_WIDTH_THRESHOLD}
        >
          <Status height={ROW_HEIGHT} />
        </RowPrimaryWrapper>
        <RowSecondaryWrapper
          hOrder={0}
          vOrder={1}
          thresholdStickyMenu={SIDE_MENU_STICKY_THRESHOLD}
          thresholdFullWidth={SECTION_FULL_WIDTH_THRESHOLD}
        >
          <CardWrapper height={ROW_HEIGHT}>
            <ManageBond />
          </CardWrapper>
        </RowSecondaryWrapper>
      </PageRowWrapper>
    </>
  );
};

export default Active;
