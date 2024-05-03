'use client';
import AllDaos from '@/components/all-daos';
import Cards from '@/components/dashboard/cards';
import { dashboardFeedsData } from '@/components/dashboard/data';
import { Button } from '@/components/ui/button';
import { SELECT_DAO_STYLE_URL } from '@/config/path';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/app-context';
import DashboadLoading from '@/components/loading/dashboard-loading';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { getBasicDAO } from '@/libs/ae-utils';

const Dashboard = () => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { DAOsData, daoLoading, getEachDAO } = useContext(AppContext);
  const connected: boolean = user.isConnected;
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q');
  let userDAO: any[] = [];
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [totalProposals, setTotalProposals] = useState<number>(0);

  const getDAOsData = (width: number) => {
    console.log({ DAOsData });
    let individualDAOs;

    individualDAOs = DAOsData?.filter((dao: any) => {
      if (dao.members.includes(user.address)) {
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
      }
    });
    userDAO = individualDAOs;
    if (currentSearch) {
      return individualDAOs.filter((item: { organisation: string }) => item?.organisation?.toLocaleLowerCase().includes(currentSearch.toLowerCase()))
    } else {
      return individualDAOs;
    }
  };

  const getUserTotalDao = () => {
    return DAOsData?.filter((dao: any) => {
      if (dao.members.includes(user.address)) {
        return dao;
      }
    });
  }

  const userTotals = async () => {
    const daoInfos = getUserTotalDao();
    const voteAndProposalPromises = daoInfos.map(async (dao: { organisation: string }) => {
      const eachDaoName = dao.organisation.toLowerCase().replace(/\s+/g, '-');
      const getEachInfo = await getEachDAO(eachDaoName);
      const contract = await getBasicDAO(getEachInfo.contractAddress);
      const eachActivity = await contract.getMemberActivities(user.address);
      console.log(eachActivity, '->contract');
      const votes = await eachActivity.decodedResult.voteCasted;
      const proposals = await eachActivity.decodedResult.proposalsCreated;
      return { proposals: Number(proposals), voteCasted: Number(votes)};
    });
    const responses = await Promise.all(voteAndProposalPromises);
    const totalVotes = responses.reduce((accumulator, currentValue) => accumulator + currentValue.voteCasted, 0);
    const totalProposals = responses.reduce((accumulator, currentValue) => accumulator + currentValue.proposals, 0);
    console.log({ totalVotes, totalProposals }, '-> responses')
    return { totalVotes, totalProposals };
  };

  useEffect(() => {
    const fetchData = async () => {
      const userTotalData = await userTotals();
      setTotalVotes(userTotalData.totalVotes);
      setTotalProposals(userTotalData.totalProposals);
    };

    fetchData();
  }, []);

  console.log({totalVotes, totalProposals})

  if (daoLoading) return <DashboadLoading />;

  return (
    <div className="space-y-8 min-h-[80vh]">
      <div className="flex justify-between items-center">
        <h1
          role="heading"
          className="dark:text-white text-[#292929] font-medium text-xl"
        >
          Global Feed
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

      <div className="gap-6 md:grid-cols-3 grid">
        {dashboardFeedsData(connected, getUserTotalDao(), totalProposals, totalVotes).map((feed) => (
          <Cards key={feed.title} {...feed} />
        ))}
      </div>

      <AllDaos
        dashboardTableData={getDAOsData}
        connectWalletDescription="Connect your wallet to be able to see your dashboard"
        showDAO={connected}
      />
    </div>
  );
};

export default Dashboard;
