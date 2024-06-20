import {
  walletDetector,
  BrowserWindowMessageConnection,
  RpcRejectedByUserError,
  AeSdkAepp,
  Node,
} from '@aeternity/aepp-sdk';
import { ConnectWalletParams, WalletConnection } from './types';

import nucleusDAOAci from './contract/NucleusDAO.json';
import basicDAOAci from './contract/BasicDAO.json';
import { DASHBOARD_URL } from '@/config/path';
import { toast } from 'sonner';

const nucleusDAOContractAddress =
  'ct_tty8uyUaw1LCCveugDympVzdWmcJntGG1wbFPiurqYR5m3iss';

export const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
export const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
export const COMPILER_URL = 'https://compiler.aepps.com';

export const detectWallets = async () => {
  const connection = new BrowserWindowMessageConnection();
  return new Promise<WalletConnection>((resolve, reject) => {
    const stopDetection = walletDetector(
      connection,
      async ({ newWallet }: any) => {
        stopDetection();
        resolve(newWallet.getConnection());
      }
    );
  });
};

interface DeepLinkParams {
  type: string;
  callbackUrl?: string;
  [key: string]: string | undefined; // Allow any additional parameters as strings
}

export const createDeepLinkUrl = ({
  type,
  callbackUrl,
  ...params
}: DeepLinkParams): URL => {
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

let aeSdks: any = new AeSdkAepp({
  name: 'NucleusDAO',
  nodes: [
    { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
    { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
  ],
  onNetworkChange: async ({ networkId }) => {
    const [{ name }] = (await aeSdks.getNodesInPool()).filter(
      (node: any) => node.nodeNetworkId === networkId
    );
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

export const IN_FRAME =
  typeof window !== 'undefined' && window.parent !== window;
export const IS_MOBILE =
  typeof window !== 'undefined' && window.navigator.userAgent.includes('Mobi');
export const isSafariBrowser = () =>
  navigator.userAgent.includes('Safari') &&
  !navigator.userAgent.includes('Chrome');

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
  isHome,
  walletObj = { info: { name: '', type: '' } },
  aeSdk,
}: ConnectWalletParams) => {
  setConnectingToWallet(true);
  let addressDeepLink: any;

  if ((IS_MOBILE || isSafariBrowser()) && !IN_FRAME) {
    if (address) {
      setConnectingToWallet(false);
      return;
    }
    if (isHome) {
      const domainName =
        typeof window !== 'undefined' && window.location.origin;
      const dashboardURL = `${domainName}/${DASHBOARD_URL}/`;
      addressDeepLink = createDeepLinkUrl({
        type: 'address',
        'x-success': `${
          dashboardURL.split('?')[0]
        }?address={address}&networkId={networkId}`,
        'x-cancel': dashboardURL.split('?')[0],
      });
    } else {
      addressDeepLink = createDeepLinkUrl({
        type: 'address',
        'x-success': `${
          window.location.href.split('?')[0]
        }?address={address}&networkId={networkId}`,
        'x-cancel': window.location.href.split('?')[0],
      });
    }
    if (typeof window !== 'undefined') {
      window.location.replace(addressDeepLink);
    }
  } else {
    try {
      await resolveWithTimeout(30000, async () => {
        const webWalletTimeout = IS_MOBILE
          ? 0
          : setTimeout(() => setEnableIFrameWallet(true), 15000);

        let resolve: any = null;
        let rejected = (e: any) => {
          throw e;
        };
        let stopScan: any = null;

        const connectWallet = async (wallet: any) => {
          try {
            const { networkId } = await aeSdk.connectToWallet(
              wallet.getConnection()
            );
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
            console.log(e.message);
            rejected(e);
          }
        };
        if (walletObj.getConnection) {
          await connectWallet(walletObj);
        } else {
          const handleWallet = async ({ wallets }: any) => {
            const detectedWalletObject = Object.values(wallets).find(
              (wallet: any) => wallet.info.name === walletObj.info.name
            );
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
          message:
            'Login with your wallet has failed. Please make sure that you are logged into your wallet.',
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
