// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Element } from 'react-scroll';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { PageRowWrapper, GoBackWrapper } from 'Wrappers';
import { CardWrapper } from 'library/Graphs/Wrappers';
import { PageTitle } from 'library/PageTitle';
import { Button } from 'library/Button';
import { useDDCStake } from 'contexts/DDCStakeUI';
import { SetController } from './SetController';
import { Bond } from './Bond';
import { Summary } from './Summary';

export const Setup = ({ title }: any) => {
  const { setOnSetup } = useDDCStake();

  return (
    <>
      <PageTitle title={`${title} Setup`} />
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <GoBackWrapper>
          <Button
            inline
            title="Go Back"
            icon={faChevronLeft}
            transform="shrink-3"
            onClick={() => setOnSetup(0)}
          />
        </GoBackWrapper>
      </PageRowWrapper>
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <CardWrapper>
          <Element name="controller" style={{ position: 'absolute' }} />
          <SetController section={1} />
        </CardWrapper>
      </PageRowWrapper>
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <CardWrapper>
          <Element name="summary" style={{ position: 'absolute' }} />
          <Summary section={2} />
        </CardWrapper>
      </PageRowWrapper>
    </>
  );
};

export default Setup;
