'use client';

import AllDaos from '@/components/all-daos';
import { dashboardTableData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'sonner';

const Daos = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const connected: boolean = user.isConnected;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1
          role="heading"
          className="dark:text-white font-medium text-xl text-dark"
        >
          Explore DAOs
        </h1>
        {connected ? (
          <Link href={SELECT_DAO_STYLE_URL}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create DAO
            </Button>
          </Link>
        ) : (
          <Button onClick={() => toast.error('Please connect your wallet!')}>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        )}
      </div>
      <AllDaos dashboardTableData={dashboardTableData} />
    </div>
  );
};

export default Daos;
