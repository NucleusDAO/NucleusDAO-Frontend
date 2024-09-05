import { walletDetector, BrowserWindowMessageConnection, RpcRejectedByUserError, AeSdkAepp, Node } from '@aeternity/aepp-sdk';
import { ConnectWalletParams, WalletConnection } from './types';

import nucleusDAOAci from './contract/NucleusDAO.json';
import basicDAOAci from './contract/BasicDAO.json';
import { toast } from 'sonner';
import { isMobile } from './utils';

export let nucleusDAOContractAddress = process.env.NEXT_PUBLIC_MAINNET_WALLET;

const CONTRACT_ADDRESSES = {
  mainnet: process.env.NEXT_PUBLIC_MAINNET_WALLET,
  testnet: process.env.NEXT_PUBLIC_TESTNET_WALLET, // Replace with your actual testnet address
};

export const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
export const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
export const COMPILER_URL = 'https://compiler.aepps.com';

export const detectWallets = async () => {
  const connection = new BrowserWindowMessageConnection();
  return new Promise<WalletConnection>((resolve, reject) => {
    const stopDetection = walletDetector(connection, async ({ newWallet }: any) => {
      stopDetection();
      resolve(newWallet.getConnection());
    });
  });
};

interface DeepLinkParams {
  type?: string;
  callbackUrl?: string;
  [key: string]: string | undefined; // Allow any additional parameters as strings
}

export const createDeepLinkUrl = ({ type, callbackUrl, ...params }: DeepLinkParams): URL => {
  const url = new URL(`${process.env.NEXT_PUBLIC_WALLET_URL}/${type}`);

  if (callbackUrl) {
    url.searchParams.set('x-success', callbackUrl);
    url.searchParams.set('x-cancel', callbackUrl);
  }

  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null) // Filter out undefined and null values
    .forEach(([name, value]) => url.searchParams.set(name, value as string)); // Assert value as string

  return url;
};

export let aeSdks: any = new AeSdkAepp({
  name: 'NucleusDAO',
  nodes: [
    { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
    { name: 'testnet', instance: new Node(TESTNET_NODE_URL) }, // Add the testnet node
  ],
  onNetworkChange: async ({ networkId }) => {
    const [{ name }] = (await aeSdks.getNodesInPool()).filter((node: any) => node.nodeNetworkId === networkId);
    aeSdks.selectNode(name);
  },
  onAddressChange: ({ current }: any) => {
    const currentAccountAddress = Object.keys(current)[0];
    const user = { address: currentAccountAddress, isConnected: true };
    localStorage.setItem('user', JSON.stringify(user));
  },
  onDisconnect: () => {
    localStorage.removeItem('user');
  },
});

export async function switchNetwork(network: 'mainnet' | 'testnet') {
  try {
    // Select the node (network) to switch to
    aeSdks.selectNode(network);

    const currentNetworkId = aeSdks.selectedNodeName;

    // Wait a short moment to ensure the switch takes effect
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get the current active node's network ID
    const nodes = await aeSdks.getNodesInPool();

    const currentNode = nodes.find((node: any) => node.name === currentNetworkId);

    if (currentNode?.name === network) {
      nucleusDAOContractAddress = CONTRACT_ADDRESSES[network];
      return true; // Indicate success
    } else {
      return false; // Indicate failure
    }
  } catch (error: any) {
    return false; // Indicate failure
  }
}

export const IN_FRAME = typeof window !== 'undefined' && window.parent !== window;
export const IS_MOBILE = typeof window !== 'undefined' && window.navigator.userAgent.includes('Mobi');
export const isSafariBrowser = () => navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

export const resolveWithTimeout = (timeout: number, callback: any) =>
  Promise.race([
    callback(),
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error(`Promise TIMEOUT after ${timeout} ms`));
      }, timeout)
    ),
  ]);

export const connectWallet = async ({
  setConnectingToWallet,
  setEnableIFrameWallet,
  setUser,
  address,
  setConnectionError,
  setOpenModal,
  walletObj = { info: { name: '', type: '' } },
  aeSdk,
}: ConnectWalletParams) => {
  setConnectingToWallet(true);
  let addressDeepLink: any;

  if ((isMobile() || isSafariBrowser()) && !IN_FRAME) {
    if (address) {
      setConnectingToWallet(false);
      return;
    }

    const baseURL = window.location.href;
    addressDeepLink = createDeepLinkUrl({
      type: 'address',
      'x-success': `${baseURL.split('?')[0]}?address={address}&networkId={networkId}`,
      'x-cancel': baseURL.split('?')[0],
    });

    typeof window !== 'undefined' && window.open(addressDeepLink, '_self');
  } else {
    try {
      await resolveWithTimeout(30000, async () => {
        const webWalletTimeout = IS_MOBILE || isMobile() ? 0 : setTimeout(() => setEnableIFrameWallet(true), 15000);

        let resolve: any = null;
        let rejected = (e: any) => {
          throw e;
        };
        let stopScan: any = null;

        const connectWallet = async (wallet: any) => {
          try {
            const { networkId } = await aeSdk.connectToWallet(wallet.getConnection());
            const ret = await aeSdk.subscribeAddress('subscribe', 'connected');
            const {
              address: { current },
            } = ret;
            const currentAccountAddress = Object.keys(current)[0];
            if (!currentAccountAddress) return;
            stopScan?.();
            const user = { address: currentAccountAddress, isConnected: true };
            setUser(user);
            aeSdks = aeSdk;
            // localStorage.setItem('user', JSON.stringify(user));
            resolve?.(currentAccountAddress);
            setOpenModal(false);
          } catch (e: any) {
            if (!(e instanceof RpcRejectedByUserError)) {
              alert('error occured');
            }
            if (e.message === 'Operation rejected by user') {
              toast.error(e.message);
              resolve = null;
              rejected = (e: any) => {
                throw e;
              };
              stopScan = null;
            }
            rejected(e);
          }
        };
        if (walletObj.getConnection) {
          await connectWallet(walletObj);
        } else {
          const handleWallet = async ({ wallets }: any) => {
            const detectedWalletObject = Object.values(wallets).find((wallet: any) => wallet.info.name === walletObj.info.name);
            if (!detectedWalletObject) return;
            clearInterval(webWalletTimeout);
            await connectWallet(detectedWalletObject);
          };
          const scannerConnection = new BrowserWindowMessageConnection();
          stopScan = walletDetector(scannerConnection, handleWallet);

          await new Promise((_resolve: any, _rejected: any) => {
            resolve = _resolve;
            rejected = _rejected;
          });
        }
      });
    } catch (error) {
      if (walletObj.info.name === 'Superhero') {
        setConnectionError({
          type: 'denied',
          message: 'Login with your wallet has failed. Please make sure that you are logged into your wallet.',
        });
      } else {
        setConnectionError({
          type: 'timeout',
          message: `Connection to ${walletObj.info.name} has been timeout, please try again later.`,
        });
      }
    }
  }
};

export const getNucleusDAO = async () => {
  const contract = await aeSdks.initializeContract({
    aci: nucleusDAOAci,
    address: nucleusDAOContractAddress,
  });
  return contract;
};

export const getBasicDAO = async (DAOAddress: string) => {
  return await aeSdks.initializeContract({
    aci: basicDAOAci,
    address: DAOAddress,
  });
};
