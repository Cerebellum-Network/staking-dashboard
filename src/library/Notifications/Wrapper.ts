// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { backgroundPrimary, networkColor, textSecondary } from 'theme';

export const Wrapper = styled.ul`
  position: fixed;
  bottom: 20px;
  right: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
  z-index: 10;

  li {
    background: ${backgroundPrimary};
    width: 360px;
    margin: 0.4rem 1.2rem;
    position: relative;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;

    h3 {
      color: ${networkColor};
      margin: 0 0 0.5rem;
      flex: 1;
    }
    h5 {
      color: ${textSecondary};
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      max-width: 100%;
    }
  }
`;

export default Wrapper;
