// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  PageRowWrapper,
  RowPrimaryWrapper,
  RowSecondaryWrapper,
} from 'Wrappers';
import { CardWrapper } from 'library/Graphs/Wrappers';
import { PageTitle } from 'library/PageTitle';
import {
  SECTION_FULL_WIDTH_THRESHOLD,
  SIDE_MENU_STICKY_THRESHOLD,
} from 'consts';
import { ManageBond } from './ManageBond';
import { Status } from './Status';

export const Active = ({ title }: any) => {
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
