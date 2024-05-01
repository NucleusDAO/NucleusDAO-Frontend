'use client';

import AllDaos from '@/components/all-daos';
import { dashboardTableData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL, VIEW_DAO_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

const Daos = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOs } = useContext(AppContext);
  const [DAOsData, setDAOsData] = useState(DAOs);
  const connected: boolean = user.isConnected;
  const [loading, setLoading] = useState<boolean>(true);

  const getDAOsData = (width: number) => {
    return DAOsData?.map((dao: any) => {
      dao.orgIcon = (
        <img src={dao.image} alt='dao logo' width={width} height={width} />
      );
      return dao;
    });
  };

  useEffect(() => {
    console.log({ DAOs });
    if (DAOs) {
      setDAOsData(
        DAOs.map((dao: any) => {
          return {
            organisation: dao.name,
            image: dao.image,
            activeMember: dao.members.length.toString(),
            activeProposal: `${dao.totalProposals}(${dao.activeProposals})`,
            description: dao.description,
            votes: dao.totalVotes.toString(),
            url: encodeURI(
              window.location.origin +
                VIEW_DAO_URL +
                '/' +
                dao.id +
                '/dashboard'
            ),
          };
        })
      );
      setLoading(false);
    }
  }, [DAOs]);
  return (
    !loading && (
      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <h1
            role='heading'
            className='dark:text-white font-medium text-xl text-dark'
          >
            Explore DAOs
          </h1>
          {connected ? (
            <Link href={SELECT_DAO_STYLE_URL}>
              <Button>
                <Plus className='mr-2 h-4 w-4' /> Create DAO
              </Button>
            </Link>
          ) : (
            <Button onClick={() => toast.error('Please connect your wallet!')}>
              <Plus className='mr-2 h-4 w-4' /> Create DAO
            </Button>
          )}
        </div>
        <AllDaos dashboardTableData={getDAOsData} showDAO={true} />
      </div>
    )
  );
};

export default Daos;
