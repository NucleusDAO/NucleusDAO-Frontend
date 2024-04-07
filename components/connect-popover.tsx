import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { AppContext } from '@/context/app-context';
import { ReactNode, useContext } from 'react';

interface IConnectWalletPopOver {
    callToAction: ReactNode;
}

const ConnectWalletPopOver = ({ callToAction }: IConnectWalletPopOver) => {
  const { handleConnectWallet, user, isConnecting, handleDisconnect, isDisConnecting } =
    useContext<any>(AppContext);
  const connected: boolean = user.isConnected;
  return (
    <Popover>
      <PopoverTrigger asChild>
        {callToAction}
      </PopoverTrigger>
      <PopoverContent
        className="mt-2 px-6 pt-3 pb-8 md:w-[80%]"
        style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
      >
        <div className=' space-y-3'>
          {connected ? (
            <>
              <div
                className="dark:bg-[#1E1E1E] bg-white h-11 rounded-lg flex items-center text-[#888888] p-3 text-[12px] space-x-3"
                role="button"
              >
                <Image src={RoundedIcon} alt="logo" width={28} />
                <p className="overflow-hidden text-ellipsis">{user.address}</p>
              </div>
              <div
                className="dark:bg-[#1E1E1E] bg-white h-11 rounded-lg flex items-center text-[#888888] p-3 text-[12px] space-x-3"
                role="button"
                onClick={handleDisconnect}
              >
                <LogOut size={20} />
                <p>{isDisConnecting ? 'Disconnecting' : 'Disconnect'}</p>
              </div>
            </>
          ) : (
            <Button
              onClick={handleConnectWallet}
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
