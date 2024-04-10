import {
  walletDetector,
  BrowserWindowMessageConnection,
  RpcConnectionDenyError,
  RpcRejectedByUserError,
  AlreadyConnectedError,
  AeSdkAepp,
  Node,
} from '@aeternity/aepp-sdk';
import { toast } from 'sonner';

const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

export const aeSdk: any = new AeSdkAepp({
  name: 'NucleusDAO',
  nodes: [
    { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
    { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
  ],
  onNetworkChange: async ({ networkId }) => {
    const [{ name }] = (await aeSdk.getNodesInPool()).filter(
      (node: any) => node.nodeNetworkId === networkId
    );
    aeSdk.selectNode(name);
    console.log('setNetworkId', networkId);
  },
  onAddressChange: ({ current }: any) =>
    console.log('setAddress', Object.keys(current)[0]),
  onDisconnect: () => console.log('Aepp is disconnected'),
});

interface WalletConnection {
    id: string;
    name: string;
  }

export const detectWallets = async () => {
    const connection = new BrowserWindowMessageConnection();
    return new Promise<WalletConnection>((resolve, reject) => {
      const stopDetection = walletDetector(connection, async ({ newWallet }: any) => {
        stopDetection();
        resolve(newWallet.getConnection());
      });
    });
}

interface DeepLinkParams {
  type: string;
  callbackUrl?: string;
  [key: string]: string | undefined; // Allow any additional parameters as strings
}

export const createDeepLinkUrl = ({ type, callbackUrl, ...params }: DeepLinkParams): URL => {
  const url = new URL(`${process.env.NEXT_PUBLIC_WALLET_URL ?? 'default-wallet-url'}/${type}`);

  if (callbackUrl) {
    url.searchParams.set('x-success', callbackUrl);
    url.searchParams.set('x-cancel', callbackUrl);
  }

  Object.entries(params)
    .forEach(([name, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(name, value);
      }
    });

  return url;
};


export const IN_FRAME = window.parent !== window;
export const IS_MOBILE = window.navigator.userAgent.includes('Mobi');
export const isSafariBrowser = () => navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

export const connectWallet = async () => {
  let walletInfo;
  let stopScan: any = null;

  if ((IS_MOBILE || isSafariBrowser()) && !IN_FRAME) {
    const addressDeepLink = createDeepLinkUrl({
      type: 'address',
      'x-success': `${window.location.href.split('?')[0]}?address={address}&networkId={networkId}`,
      'x-cancel': window.location.href.split('?')[0],
    });
    window.location.href = addressDeepLink.toString();
    // window.location = addressDeepLink;
  }

  try {
    const connection: any = await detectWallets();
    console.log(connection, '> connect')
    try {
      walletInfo = await aeSdk.connectToWallet(connection);
    } catch (error) {
      if (error instanceof AlreadyConnectedError)
      if (error instanceof RpcConnectionDenyError) connection.disconnect()
      throw error;
    }
    const {
      address: { current },
    } = await aeSdk.subscribeAddress('subscribe', 'connected');
    const currentAccountAddress = Object.keys(current)[0];
    if (!currentAccountAddress) return;
    stopScan?.();
    if (currentAccountAddress) {
      localStorage.setItem('user', JSON.stringify({ address: currentAccountAddress, isConnected: true }))
      return { address: currentAccountAddress, isConnected: true };
    }
  } catch (error: any) {
    if (error instanceof RpcRejectedByUserError) {
      return error.message
    }
    toast.error(error.message || 'Cannot connect to wallet at the momment');
  }
};