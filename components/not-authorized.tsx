'use client';
import Image from 'next/image';
import EmptyDAO from '@/assets/icons/empty-icon.png';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';

interface INotAuthorized {
  description: string;
}

const NotAuthorized = ({ description }: INotAuthorized) => {
  const router = useRouter();
  const { handleConnectWallet } =
    useContext<IConnectWalletContext>(ConnectWalletContext);
  return (
    <div className="min-h-[80vh] w-full text-center flex items-center justify-center">
      <div className="w-[30%] space-y-4">
        <Image src={EmptyDAO} alt="DAO empty" width={100} className="mx-auto" />
        <p className="mt-2">{description}</p>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="px-10"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
