import { Node, AeSdk, MemoryAccount, AeSdkAepp } from '@aeternity/aepp-sdk';

import nucleusDAOAci from './contract/NucleusDAO.json';
import basicDAOAci from './contract/BasicDAO.json';
import CryptoJS from 'crypto-js';
import { aeSdks, nucleusDAOContractAddress } from './ae-utils';

const network = (typeof window !== 'undefined' && localStorage.getItem('network')) || 'mainnet';

export const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
export const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
export const COMPILER_URL = 'https://compiler.aepps.com';

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

const generateKey: any = () => {
  const secretKey = CryptoJS.lib.WordArray.random(64).toString();
  return secretKey;
};

const node = new Node(network === 'mainnet' ? MAINNET_NODE_URL : TESTNET_NODE_URL); // ideally host your own node
const account = new MemoryAccount(generateKey());
const newUserAccount = MemoryAccount.generate();

// let aeSdk: any = new AeSdkAepp({
//   name: 'NucleusDAO',
//   nodes: [
//     { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
//     { name: 'testnet', instance: new Node(TESTNET_NODE_URL) }, // Add the testnet node
//   ],
//   onNetworkChange: async ({ networkId }) => {
//     const [{ name }] = (await aeSdk.getNodesInPool()).filter((node: any) => node.nodeNetworkId === networkId);
//     aeSdk.selectNode(name);
//   },
//   onAddressChange: ({ current }: any) => {
//     const currentAccountAddress = Object.keys(current)[0];
//     const user = { address: currentAccountAddress, isConnected: true };
//     localStorage.setItem('user', JSON.stringify(user));
//   },
//   onDisconnect: () => {
//     localStorage.removeItem('user');
//   },
// });

// const aeSdk: any = new AeSdk({
//   nodes: network === 'mainnet' ? { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) } : { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
//   accounts: [account, newUserAccount],
//   // onCompiler: compiler, // remove if step #2 skipped
// });

const createDeepLinkUrl2 = async ({ type, callbackUrl, ...params }: any) => {
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

export const createOnAccountObject = (address: string) => ({
  address,
  signTransaction: () => null,
});

interface IMobileInterract {
  redirectUrl: string;
  result: any;
}

export const mobileContractInterract = async ({ redirectUrl, result }: IMobileInterract) => {
  const encodedTx = await result.rawTx;

  const domainName = typeof window !== 'undefined' && window.location.origin;

  const baseUrl = `${domainName}${redirectUrl}/`;

  const currentUrl = new URL(baseUrl);
  // reset url
  currentUrl.searchParams.delete('transaction');
  currentUrl.searchParams.delete('transaction-status');

  // append transaction parameter for success case
  const successUrl = new URL(currentUrl.href);

  successUrl.searchParams.set('transaction', '{transaction}');

  // append transaction parameter for failed case
  const cancelUrl = new URL(currentUrl.href);
  cancelUrl.searchParams.set('transaction-status', 'cancelled');

  console.log(network, '-> net');

  const response = await createDeepLinkUrl2({
    type: 'sign-transaction',
    transaction: encodedTx,
    networkId: network === 'mainnet' ? 'ae_mainnet' : 'ae_uat',
    broadcast: true,
    // decode these urls because they will be encoded again
    'x-success': decodeURI(successUrl.href),
    'x-cancel': decodeURI(cancelUrl.href),
  });
  if (typeof window !== 'undefined') {
    window.open(response, '_self');
  }
};

export const getNucleusDAO = async () => {
  const getNetwork = localStorage.getItem('network');
  const network = getNetwork === 'testnet' ? 'testnet' : 'mainnet';
  const address = getNetwork === 'testnet' ? process.env.NEXT_PUBLIC_TESTNET_WALLET : process.env.NEXT_PUBLIC_MAINNET_WALLET;
  await aeSdks.selectNode(network);
  const contract = await aeSdks.initializeContract({
    aci: nucleusDAOAci,
    address,
  });
  return contract;
};

export const getBasicDAO = async (DAOAddress: string) => {
  const getNetwork = localStorage.getItem('network');
  const network = getNetwork === 'testnet' ? 'testnet' : 'mainnet';
  await aeSdks.selectNode(network);
  return await aeSdks.initializeContract({
    aci: basicDAOAci,
    address: DAOAddress,
  });
};
