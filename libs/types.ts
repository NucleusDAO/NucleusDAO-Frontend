export type WalletInfo = {
  name: string;
  type: string;
//   getConnection: () => Promise<any>
};

export type WalletConnection = {
  getConnection: () => Promise<any>|any; // Adjust any to the actual return type of getConnection
};

export type DeepLinkParams = {
  type: string;
  [key: string]: string | undefined; // Allow additional parameters with string values
};

export type User = {
  address: string;
  isConnected: boolean;
};

export type ConnectionError = {
  type: string;
  message: string;
};

export type ConnectWalletParams = {
  setConnectingToWallet: (value: boolean) => void;
  setEnableIFrameWallet: (value: boolean) => void;
  setUser: (user: User) => void;
  setConnectionError: (error: ConnectionError) => void;
  address?: string;
  setOpenModal: (arg: boolean) => void;
  walletObj?: {
    info: WalletInfo;
    getConnection?: () => Promise<any>|any; // Adjust any to the actual return type of getConnection
  };
};

export type HandleWalletFunction = (wallets: { [key: string]: any }) => void;

export type WalletScanningParams = {
  setScanningForWallets: React.Dispatch<React.SetStateAction<boolean>>;
  setWallets: React.Dispatch<React.SetStateAction<any[]>>;
  addDefaultWallet: () => void;
};