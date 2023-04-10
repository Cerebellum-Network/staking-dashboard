// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonSecondary, PageRow } from '@polkadotcloud/core-ui';
import { extractUrlValue, removeVarFromUrlHash } from '@polkadotcloud/utils';
import { TopBarWrapper } from 'Wrappers';
import { useConnect } from 'contexts/Connect';
import { useSetup } from 'contexts/Setup';
import { CardWrapper } from 'library/Graphs/Wrappers';
import { PageTitle } from 'library/PageTitle';
import { Nominate } from 'library/SetupSteps/Nominate';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Element } from 'react-scroll';
import { Bond } from './Bond';
import { Payee } from './Payee';
import { Summary } from './Summary';

export const Setup = () => {
  const { t } = useTranslation('pages');
  const navigate = useNavigate();
  const { activeAccount } = useConnect();
  const { setOnNominatorSetup, removeSetupProgress } = useSetup();

  return (
    <>
      <PageTitle title={t('nominate.startNominating')} />
      <PageRow noVerticalMargin>
        <TopBarWrapper>
          <span>
            <ButtonSecondary
              lg
              text={t('nominate.back')}
              iconLeft={faChevronLeft}
              iconTransform="shrink-3"
              onClick={() => {
                if (extractUrlValue('f') === 'overview') {
                  navigate('/overview');
                } else {
                  removeVarFromUrlHash('f');
                  setOnNominatorSetup(false);
                }
              }}
            />
          </span>
          <span>
            <ButtonSecondary
              lg
              text={t('nominate.cancel')}
              iconLeft={faTimes}
              onClick={() => {
                removeVarFromUrlHash('f');
                setOnNominatorSetup(false);
                removeSetupProgress('nominator', activeAccount);
              }}
            />
          </span>
          <div className="right" />
        </TopBarWrapper>
      </PageRow>
      <PageRow noVerticalMargin>
        <CardWrapper>
          <Element name="payee" style={{ position: 'absolute' }} />
          <Payee section={1} />
        </CardWrapper>
      </PageRow>
      <PageRow noVerticalMargin>
        <CardWrapper>
          <Element name="nominate" style={{ position: 'absolute' }} />
          <Nominate
            batchKey="generate_nominations_inactive"
            bondFor="nominator"
            section={2}
          />
        </CardWrapper>
      </PageRow>
      <PageRow noVerticalMargin>
        <CardWrapper>
          <Element name="bond" style={{ position: 'absolute' }} />
          <Bond section={3} />
        </CardWrapper>
      </PageRow>
      <PageRow noVerticalMargin>
        <CardWrapper>
          <Element name="summary" style={{ position: 'absolute' }} />
          <Summary section={4} />
        </CardWrapper>
      </PageRow>
    </>
  );
};
