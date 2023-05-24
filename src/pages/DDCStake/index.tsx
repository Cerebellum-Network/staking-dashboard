// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useDDCStake } from 'contexts/DDCStakeUI';
import { PageProps } from '../types';
import { Wrapper } from './Wrappers';
import { Active } from './Active';
import { Setup } from './Setup';

export const Stake = (props: PageProps) => {
  const { page } = props;
  const { title } = page;
  const { onSetup, setOnSetup } = useDDCStake();

  return (
    <Wrapper>
      {onSetup ? (
        <Setup title={title} setOnSetup={setOnSetup} />
      ) : (
        <Active title={title} setOnSetup={setOnSetup} />
      )}
    </Wrapper>
  );
};

export default Stake;
