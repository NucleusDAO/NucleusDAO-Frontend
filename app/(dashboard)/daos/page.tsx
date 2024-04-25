'use client';

import AllDaos from '@/components/all-daos';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from './loading';

const Daos = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOs } = useContext(AppContext);
  const [DAOsData, setDAOsData] = useState([]);
  const connected: boolean = user.isConnected;
  const [loading, setLoading] = useState<boolean>(true);

  const getDAOsData = (width: number) => {
    return DAOsData?.map((dao: any) => {
      dao.orgIcon = (
        <img
          src={dao.image}
          alt="dao logo"
          width={width}
          height={width}
          className="border border-red w-8 h-8 md:w-10 md:h-10 rounded-md"
        />
      );
      return dao;
    });
  };

  useEffect(() => {
    if (DAOs) {
      setDAOsData(
        DAOs.map((dao: any) => {
          return {
            organisation: dao.name,
            image: dao.image,
            activeMember: dao.members.length.toString(),
            activeProposal: `${dao.proposals}(${dao.activeProposals})`,
            description: dao.description,
            votes: '',
            url: `https://nucleusdao.com/dao/${dao.name
              .toLowerCase()
              .replace(/\s/g, '-')}`,
          };
        })
      );
      setLoading(false);
    }
  }, [DAOs]);

  if (loading) return <Loading />;

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

      {DAOsData?.length === 0 && (
        <div className="min-h-[70vh] flex items-center justify-center">
          <p>There is no active DAO currently</p>
        </div>
      )}
      {DAOsData?.length > 0 && (
        <AllDaos dashboardTableData={getDAOsData} showDAO={true} />
      )}
    </div>
  );
};

export default Daos;
