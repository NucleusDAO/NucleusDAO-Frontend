'use client';
import AllDaos from '@/components/all-daos';
import Cards from '@/components/dashboard/cards';
import {
  dashboardFeedsData,
  dashboardTableData,
} from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

const Dashboard = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const connected: boolean = user.isConnected;
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1
          role="heading"
          className="dark:text-white text-[#292929] font-medium text-xl"
        >
          Global Feed
        </h1>
        <Link href={SELECT_DAO_STYLE_URL}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        </Link>
      </div>

      <div className="gap-6 md:grid-cols-3 grid">
        {dashboardFeedsData(connected).map((feed) => (
          <Cards key={feed.title} {...feed} />
        ))}
      </div>

      <AllDaos dashboardTableData={dashboardTableData} connectWalletDescription="Connect your wallet to be able to see your dashboard" showDAO={connected} />
    </div>
  );
};

export default Dashboard;
