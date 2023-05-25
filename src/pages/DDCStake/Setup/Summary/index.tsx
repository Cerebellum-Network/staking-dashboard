// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useApi } from 'contexts/Api';
import { useDDCStake } from 'contexts/DDCStakeUI';
import { useConnect } from 'contexts/Connect';
import { Button } from 'library/Button';
import { humanNumber } from 'Utils';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { Warning } from 'library/Form/Warning';
import { SummaryProps } from 'pages/Stake/types';
import { SummaryWrapper } from './Wrapper';
import { MotionContainer } from '../MotionContainer';
import { Header } from '../Header';

export const Summary = (props: SummaryProps) => {
  const { section } = props;

  const { api, network } = useApi();
  const { activeAccount, accountHasSigner } = useConnect();
  const { getSetupProgress } = useDDCStake();
  const setup = getSetupProgress(activeAccount);

  const { controller, bond, nominations, payee } = setup;

  const txs = () => {
    if (!activeAccount || !api) {
      return null;
    }
    const stashToSubmit = {
      Id: activeAccount,
    };
    const controllerToSubmit = {
      Id: controller,
    };

    const role = 'edge' as 'storage' | 'edge';

    let stakingCallName;
    let prefs;
    switch (role) {
      case 'storage':
        stakingCallName = 'store';
        prefs = { foo: true };
        break;
      case 'edge':
        stakingCallName = 'serve';
        prefs = { foo: true };
        break;
      default:
        throw new Error(`Invalid role ${role}`);
    }

    // construct a batch of transactions
    const _txs = [
      api.tx.ddcStaking.bond(stashToSubmit),
      api.tx.ddcStaking[stakingCallName](prefs),
      api.tx.ddcStaking.setController(controllerToSubmit),
    ];

    return api.tx.utility.batch(_txs);
  };

  const { submitTx, estimatedFee, submitting } = useSubmitExtrinsic({
    tx: txs(),
    from: activeAccount,
    shouldSubmit: true,
    callbackSubmit: () => {},
    callbackInBlock: () => {},
  });

  return (
    <>
      <Header thisSection={section} complete={null} title="Summary" />
      <MotionContainer thisSection={section} activeSection={setup.section}>
        {!accountHasSigner(activeAccount) && (
          <Warning text="Your account is read only, and cannot sign transactions." />
        )}
        <SummaryWrapper>
          <section>
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle as IconProp}
                transform="grow-1"
              />{' '}
              &nbsp; Controller:
            </div>
            <div>{controller}</div>
          </section>
          <section>
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle as IconProp}
                transform="grow-1"
              />{' '}
              &nbsp; Bond Amount:
            </div>
            <div>
              {humanNumber(bond)} {network.unit}
            </div>
          </section>
          <section>
            <div>Estimated Tx Fee:</div>
            <div>{estimatedFee === null ? '...' : `${estimatedFee}`}</div>
          </section>
        </SummaryWrapper>
        <div
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            onClick={() => submitTx()}
            disabled={submitting || !accountHasSigner(activeAccount)}
            title="Start DDC Staking"
            primary
          />
        </div>
      </MotionContainer>
    </>
  );
};

export default Summary;
