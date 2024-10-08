'use client';

import AllDaos from '@/components/all-daos';
import { defaultProposalOption } from '@/components/animation-options';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import DaoLoading from '@/components/loading/dao-loading';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { AppContext } from '@/context/app-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { wait } from '@/libs/utils';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import Lottie from 'react-lottie';
import { toast } from 'sonner';

const Daos = () => {
  const router = useRouter();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOsData, daoLoading, isDaoError, daoError } = useContext(AppContext);
  const [isPending, setIsPending] = useState<boolean>(false);

  const connected: boolean = user.isConnected;
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q');

  const getDAOsData = () => {
    let allDAO;
    if (currentSearch) {
      allDAO = DAOsData?.filter((item: { organisation: string }) => item?.organisation?.toLowerCase().includes(currentSearch.toLowerCase()));
    } else {
      allDAO = DAOsData;
    }
    return allDAO?.map((dao: any) => {
      dao.orgIcon = (
        <div className="w-8 h-8 lg:w-12 lg:h-12">
          <img
            src={dao.image}
            alt="dao logo"
            // width={width}
            // height={width}
            className="border w-full h-full border-red rounded-md object-cover"
          />
        </div>
      );
      return dao;
    });
  };

  function handleCreaDAO() {
    setIsPending(true);
    wait().then(() => {
      if (sessionStorage.getItem('new_dao')) {
        sessionStorage.removeItem('new_dao');
      }
      router.push(SELECT_DAO_STYLE_URL);
      setIsPending(false);
    });
  }

  if (daoLoading) return <DaoLoading />;
  if (isDaoError) return <ErrorFetchingComponent title={daoError?.message || ''} />;

  return (
    <div className="space-y-2 min-h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 role="heading" className="dark:text-white font-medium text-xl text-dark">
          Explore DAOs
        </h1>
        {connected ? (
          <Button onClick={handleCreaDAO} loading={isPending} loadingText="Please wait...">
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        ) : (
          <Button onClick={() => toast.error('Please connect your wallet first!')}>
            <Plus className="mr-2 h-4 w-4" /> Create DAO
          </Button>
        )}
      </div>

      {!currentSearch && DAOsData?.length === 0 ? (
        <div className="text-center mx-auto pt-10 space-y-4">
          <Lottie options={defaultProposalOption} height={150} width={150} />
          <div className="text-center lg:w-2/5 mx-auto">
            <p className="pb-3 font-light text-sm">
              Begin by setting up governance mechanisms, defining roles and responsibilities, and establishing rules for participation.
            </p>
          </div>
        </div>
      ) : null}

      {DAOsData?.length > 0 && <AllDaos dashboardTableData={getDAOsData} showDAO={true} isConnected={connected} />}
    </div>
  );
};

export default Daos;
