'use client';

import AllDaos from '@/components/all-daos';
import DaoLoading from '@/components/loading/dao-loading';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL, VIEW_DAO_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { toast } from 'sonner';

const Daos = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOsData, daoLoading } = useContext(AppContext);
  const connected: boolean = user.isConnected;
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q');

  const getDAOsData = (width: number) => {
    let allDAO;
    if (currentSearch) {
      allDAO = DAOsData?.filter((item: { organisation: string }) =>
        item?.organisation?.toLowerCase().includes(currentSearch.toLowerCase())
      );
    } else {
      allDAO = DAOsData;
    }
    return allDAO?.map((dao: any) => {
      dao.orgIcon = (
        <img
          src={dao.image}
          alt="dao logo"
          width={width}
          height={width}
          className="border border-red w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
        />
      );
      return dao;
    });
  };

  if (daoLoading) return <DaoLoading />;

  return (
    <div className="space-y-2 min-h-[80vh]">
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

      {DAOsData?.length > 0 && (
        <AllDaos
          dashboardTableData={getDAOsData}
          showDAO={true}
          isConnected={connected}
        />
      )}
    </div>
  );
};

export default Daos;
