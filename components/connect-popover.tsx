import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CopyIcon, Loader, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { ReactNode, useContext, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Switch } from './ui/switch';
import { HexagonIcon } from '@/assets/svgs';
import { AppContext } from '@/context/app-context';
import { switchNetwork } from '@/libs/ae-utils';

interface IConnectWalletPopOver {
  callToAction: ReactNode;
}

const ConnectWalletPopOver = ({ callToAction }: IConnectWalletPopOver) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { handleSearchWallet, user, isConnecting, handleDisconnect } =
    useContext<any>(ConnectWalletContext);
  const { setNetwork, network } = useContext(AppContext);
  const connected: boolean = user.isConnected;
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  async function handleNetworkSwitch(network: 'mainnet' | 'testnet') {
    console.log(network, 'network ->');
    setIsSwitching(true);
    const success = await switchNetwork(network);
    if (success) {
      setNetwork('testnet');
      console.log('Switched to testnet successfully.');
      setIsSwitching(false);
    } else {
      toast.error('Failed to switch to testnet.');
      console.log('Failed to switch to testnet.');
      setIsSwitching(false);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{callToAction}</PopoverTrigger>
      <PopoverContent
        className="mt-2 px-6 pt-3 pb-8 lg:w-[80%]"
        style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
      >
        <div className=" space-y-3">
          {connected ? (
            <>
              <div
                className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white h-11 rounded-lg flex items-center dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                role="button"
              >
                <img
                  src={`https://avatars.z52da5wt.xyz/${user.address}`}
                  alt="logo"
                  width={isDesktop ? 28 : 20}
                />
                <p className="overflow-hidden text-ellipsis">{user.address}</p>
                <CopyToClipboard
                  text={user.address}
                  onCopy={() => toast.success('User address copied!')}
                >
                  <CopyIcon size={20} />
                </CopyToClipboard>
              </div>
              <div
                className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] bg-white h-11 rounded-lg flex items-center dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                role="button"
              >
                <HexagonIcon />
                <p>Mainnet</p>
                <Switch
                  id="network"
                  onCheckedChange={(value) =>
                    handleNetworkSwitch(value ? 'mainnet' : 'testnet')
                  }
                  defaultChecked
                  className="h-5"
                />
                <p>Testnet</p>
                {isSwitching && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
              </div>
              <div
                className="dark:bg-[#1E1E1E] bg-white h-11 rounded-lg flex items-center dark:text-[#888888] p-3 text-[12px] space-x-3 text-dark"
                role="button"
                onClick={handleDisconnect}
              >
                <LogOut size={20} />
                <p>Disconnect</p>
              </div>
            </>
          ) : (
            <Button
              onClick={handleSearchWallet}
              loading={isConnecting}
              loadingText="Connecting..."
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConnectWalletPopOver;
