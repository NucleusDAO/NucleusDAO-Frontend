import {
  walletDetector,
  BrowserWindowMessageConnection,
  RpcConnectionDenyError,
  RpcRejectedByUserError,
  AeSdkAepp, Node 
} from '@aeternity/aepp-sdk';
import { toast } from 'sonner';

const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aepps.com';

interface WalletConnection {
  id: string;
  name: string;
}

interface WalletInfo {
  id: string;
  name: string;
}

interface WalletSdk {
  onDisconnect: () => void;
  connectToWallet: (connection: WalletConnection) => Promise<WalletInfo>;
  subscribeAddress: (action: string, event: string) => Promise<{ address: { current: { [key: string]: string } } }>;
  disconnectWallet: () => void;
}

const aeSdk: any = new AeSdkAepp({
  name: 'NucleusDAO',
  nodes: [
    { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
    { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
  ],
  onNetworkChange: async ({ networkId }) => {
    const [{ name }] = (await aeSdk.getNodesInPool())
      .filter((node: any) => node.nodeNetworkId === networkId);
    aeSdk.selectNode(name);
    console.log('setNetworkId', networkId);
  },
  onAddressChange: ({ current }: any) => console.log('setAddress', Object.keys(current)[0]),
  onDisconnect: () => alert('Aepp is disconnected'),
});

export let showModal = false;


export const connectWallet = {
  data() {
    return {
      connectMethod: 'default' as 'default' | 'reverse-iframe',
      walletConnected: false,
      walletConnecting: null as null | boolean,
      reverseIframe: null as null | HTMLIFrameElement,
      reverseIframeWalletUrl: process.env.VUE_APP_WALLET_URL ?? `http://localhost:3001`,
      walletInfo: null as null | WalletInfo,
      cancelWalletDetection: null as null | (() => void),
    };
  },
  async detectWallets(this: any) {
    if (this.connectMethod === 'reverse-iframe') {
      this.reverseIframe = document.createElement('iframe');
      this.reverseIframe.src = this.reverseIframeWalletUrl;
      this.reverseIframe.style.display = 'none';
      document.body.appendChild(this.reverseIframe);
    }
    const connection = new BrowserWindowMessageConnection();
    return new Promise<WalletConnection>((resolve, reject) => {
      const stopDetection = walletDetector(connection, async ({ newWallet }: any) => {
        stopDetection();
        resolve(newWallet.getConnection());
        this.cancelWalletDetection = null;
      });
      this.cancelWalletDetection = () => {
        reject(new Error('Wallet detection cancelled'));
        stopDetection();
        this.cancelWalletDetection = null;
        if (this.reverseIframe) this.reverseIframe.remove();
      };
    });
  },
  async connect(this: any) {
    this.walletConnecting = true;
    aeSdk.onDisconnect = () => {
      this.walletConnected = false;
      this.walletInfo = null;
      if (this.reverseIframe) this.reverseIframe.remove();
    };
    try {
      const connection = await this.detectWallets();
      try {
        this.walletInfo = await aeSdk.connectToWallet(connection);
      } catch (error) {
        if (error instanceof RpcConnectionDenyError) connection.disconnect();
        throw error;
      }
      this.walletConnected = true;
      const { address: { current } } = await aeSdk.subscribeAddress("subscribe", 'connected');
      return { address: Object.keys(current)[0], isConnected: true }
    } catch (error: any) {
      toast.error(error.message || 'Cannot connect at the momment');
      if (
        error.message === 'Wallet detection cancelled' ||
        error instanceof RpcConnectionDenyError ||
        error instanceof RpcRejectedByUserError
      ) return;
      throw error;
    } finally {
      this.walletConnecting = false;
    }
  },
  async disconnect(this: any) {
    this.walletConnected = false;
    aeSdk.disconnectWallet();
  },
};
