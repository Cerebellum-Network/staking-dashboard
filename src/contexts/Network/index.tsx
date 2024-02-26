// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { extractUrlValue, varToUrlHash } from '@polkadot-cloud/utils';
import React, { createContext, useContext, useState } from 'react';
import { NetworkList } from 'config/networks';
import { DefaultNetwork } from 'consts';
import type { NetworkName } from 'types';
import type { NetworkState } from 'contexts/Api/types';
import type { NetworkContextInterface } from './types';
import { defaultNetworkContext } from './defaults';

console.log('Default network context');
console.log(defaultNetworkContext);
export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Get the initial network and prepare meta tags if necessary.
  const getInitialNetwork = () => {
    const urlNetworkRaw = extractUrlValue('n');

    const urlNetworkValid = !!Object.values(NetworkList).find(
      (n) => n.name === urlNetworkRaw
    );

    // use network from url if valid.
    if (urlNetworkValid) {
      const urlNetwork = urlNetworkRaw as NetworkName;

      if (urlNetworkValid) {
        return urlNetwork;
      }
    }
    // fallback to localStorage network if there.
    const localNetwork: NetworkName = localStorage.getItem(
      'network'
    ) as NetworkName;
    const localNetworkValid = !!Object.values(NetworkList).find(
      (n) => n.name === localNetwork
    );
    return localNetworkValid ? localNetwork : DefaultNetwork;
  };

  // handle network switching
  const switchNetwork = (name: NetworkName) => {
    console.warn(`Switching network to name: ${name}`);
    console.warn(NetworkList);

    setNetwork({
      name,
      meta: NetworkList.cereMainnet,
    });

    // update url `n` if needed.
    varToUrlHash('n', name, false);
  };

  // Store the initial active network.
  const initialNetwork = getInitialNetwork();
  console.warn('Initial network');
  console.warn(NetworkList);
  const [network, setNetwork] = useState<NetworkState>({
    name: initialNetwork,
    meta: NetworkList.cereMainnet,
  });

  return (
    <NetworkContext.Provider
      value={{
        network: network.name,
        networkData: network.meta,
        switchNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const NetworkContext = createContext<NetworkContextInterface>(
  defaultNetworkContext
);

export const useNetwork = () => useContext(NetworkContext);
