// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN } from 'bn.js';
import { MaxPayoutDays } from 'consts';
import { useStaking } from 'contexts/Staking';
import { useUi } from 'contexts/UI';
import { PayoutBar } from 'library/Graphs/PayoutBar';
import { PayoutLine } from 'library/Graphs/PayoutLine';
import { formatSize, useSize } from 'library/Graphs/Utils';
import {
  CardHeaderWrapper,
  CardWrapper,
  GraphWrapper,
} from 'library/Graphs/Wrappers';
import { OpenHelpIcon } from 'library/OpenHelpIcon';
import { PageTitle } from 'library/PageTitle';
import { StatBoxList } from 'library/StatBoxList';
import { StatusLabel } from 'library/StatusLabel';
import { SubscanButton } from 'library/SubscanButton';
import moment from 'moment';
import { useRef } from 'react';
import { AnySubscan } from 'types';
import { PageRowWrapper } from 'Wrappers';
import { useCereStats } from '../../contexts/CereStats';
import { PageProps } from '../types';
import { PayoutList } from './PayoutList';
import LastEraPayoutStatBox from './Stats/LastEraPayout';

export const Payouts = (props: PageProps) => {
  const { payouts, poolClaims } = useCereStats();
  const { isSyncing, services } = useUi();
  const { inSetup } = useStaking();
  const notStaking = !isSyncing && inSetup();

  const { page } = props;
  const { title } = page;

  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref.current);
  const { width, height, minHeight } = formatSize(size, 300);

  // take non-zero rewards in most-recent order
  let payoutsList: AnySubscan = [
    ...payouts.concat(poolClaims).filter((p: AnySubscan) => p.amount > 0),
  ].slice(0, MaxPayoutDays);

  // re-order rewards based on block timestamp
  payoutsList = payoutsList.sort((a: AnySubscan, b: AnySubscan) => {
    const x = new BN(a.block_timestamp);
    const y = new BN(b.block_timestamp);
    return y.sub(x);
  });

  return (
    <>
      <PageTitle title={title} />
      <StatBoxList>
        <LastEraPayoutStatBox />
      </StatBoxList>
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <GraphWrapper>
          <SubscanButton />
          <CardHeaderWrapper padded>
            <h4>
              Payout History
              <OpenHelpIcon helpKey="Payout History" />
            </h4>
            <h2>
              {payoutsList.length ? (
                <>
                  {moment
                    .unix(payoutsList[payoutsList.length - 1].block_timestamp)
                    .format('Do MMMM')}
                  &nbsp;-&nbsp;
                  {moment
                    .unix(payoutsList[0].block_timestamp)
                    .format('Do MMMM')}
                </>
              ) : (
                'None'
              )}
            </h2>
          </CardHeaderWrapper>
          <div className="inner" ref={ref} style={{ minHeight }}>
            {!services.includes('cereStats') ? (
              <StatusLabel
                status="active_service"
                statusFor="cereStats"
                title="Cere Stats Disabled"
                topOffset="30%"
              />
            ) : (
              <StatusLabel
                status="sync_or_setup"
                title="Not Staking"
                topOffset="30%"
              />
            )}

            <div
              className="graph"
              style={{
                height: `${height}px`,
                width: `${width}px`,
                position: 'absolute',
                opacity: notStaking ? 0.75 : 1,
                transition: 'opacity 0.5s',
              }}
            >
              <PayoutBar days={MaxPayoutDays} height="150px" />
              <PayoutLine days={MaxPayoutDays} average={10} height="75px" />
            </div>
          </div>
        </GraphWrapper>
      </PageRowWrapper>
      {!payoutsList.length ? (
        <></>
      ) : (
        <PageRowWrapper className="page-padding" noVerticalSpacer>
          <CardWrapper>
            <PayoutList
              title="Recent Payouts"
              payouts={payoutsList}
              pagination
            />
          </CardWrapper>
        </PageRowWrapper>
      )}
    </>
  );
};

export default Payouts;
