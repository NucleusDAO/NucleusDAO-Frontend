import { Node, AeSdk, MemoryAccount } from '@aeternity/aepp-sdk';

import nucleusDAOAci from './contract/NucleusDAO.json';
import basicDAOAci from './contract/BasicDAO.json';
import { PROPOSALS_URL } from '@/config/path';
import CryptoJS from 'crypto-js';
import { nucleusDAOContractAddress } from './ae-utils';

export const TESTNET_NODE_URL = 'https://testnet.aeternity.io';
export const MAINNET_NODE_URL = 'https://mainnet.aeternity.io';
export const COMPILER_URL = 'https://compiler.aepps.com';

interface DeepLinkParams {
  type?: string;
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

const generateKey: any = () => {
  const secretKey = CryptoJS.lib.WordArray.random(64).toString();
  return secretKey;
};

const node = new Node('https://testnet.aeternity.io'); // ideally host your own node
const account = new MemoryAccount(generateKey());
const newUserAccount = MemoryAccount.generate();

const aeSdk: any = new AeSdk({
  nodes: [{ name: 'testnet', instance: node }],
  accounts: [account, newUserAccount],
  // onCompiler: compiler, // remove if step #2 skipped
});

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

export const contractInterract = async (payload: any, userAddress: string) => {
  const contract = await aeSdk.initializeContract({
    aci: basicDAOAci,
    address: payload.daoContractAddress,
  });

  const result = await contract['createProposal'](
    payload.proposalType,
    payload.description,
    payload.value,
    payload.target,
    payload.info,
    {
      callStatic: true,
      onAccount: createOnAccountObject(userAddress),
    }
  );

  const encodedTx = result.rawTx;

  const domainName = typeof window !== 'undefined' && window.location.origin;
  // const dashboardURL = `${domainName}/${DASHBOARD_URL}/`;
  const baseUrl = `${domainName}/${PROPOSALS_URL}/`;

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

  return createDeepLinkUrl2({
    type: 'sign-transaction',
    transaction: encodedTx,
    networkId: 'ae_uat',
    broadcast: true,
    // decode these urls because they will be encoded again
    'x-success': decodeURI(successUrl.href),
    'x-cancel': decodeURI(cancelUrl.href),
  });
};

interface IMobileInterract {
  redirectUrl: string;
  result: any;
}

export const mobileContractInterract = async ({
  redirectUrl,
  result,
}: IMobileInterract) => {
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

  const response = await createDeepLinkUrl2({
    type: 'sign-transaction',
    transaction: encodedTx,
    networkId: 'ae_uat',
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
  const contract = await aeSdk.initializeContract({
    aci: nucleusDAOAci,
    address: nucleusDAOContractAddress,
  });
  return contract;
};

export const getBasicDAO = async (DAOAddress: string) => {
  return await aeSdk.initializeContract({
    aci: basicDAOAci,
    address: DAOAddress,
  });
};
