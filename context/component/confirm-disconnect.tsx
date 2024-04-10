'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IS_MOBILE, aeSdk } from '@/libs/ae-utils';

import { cn } from '@/libs/utils';
import { useState } from 'react';

interface IConfirmDisconnectWallet {
  setOpen: (arg: boolean) => void;
  open: boolean;
  defaultUser: { address: string; isConnected: boolean };
  setUser: (arg: { address: string; isConnected: boolean }) => void;
}

const ConfirmDisconnectWallet = ({
  setOpen,
  open,
  setUser,
  defaultUser,
}: IConfirmDisconnectWallet) => {
  const [disconnecting, setDisconnecting] = useState<boolean>(false);
  const handleDisconnect = async () => {
    setDisconnecting(true);
    if (IS_MOBILE) {
      localStorage.removeItem('user');
      setUser(defaultUser);
    } else {
      await aeSdk.disconnectWallet();
      setUser(defaultUser);
      localStorage.removeItem('user');
    }
    setDisconnecting(false);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#191919] bg-light">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn('font-medium py-3 text-white text-center')}
          >
            Disconnect Wallet
          </AlertDialogTitle>
          <AlertDialogDescription className="font-light my-4 w-full text-center">
            Are you sure you want to disconnect your wallet?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <AlertDialogAction onClick={handleDisconnect}>
            {disconnecting ? 'Disconnecting...' : 'Continue'}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDisconnectWallet;
