'use client';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import DashboadLoading from '@/components/loading/dashboard-loading';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiContext } from '@/context/api-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { EachDaoContext } from '@/context/each-dao-context';
import { IConnectWalletContext, IProposal } from '@/libs/types';
import { getDuration, getStatus } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Proposals = () => {
  const { currentDAO, eachDAOProposal, setEachDAOProposal } =
    useContext(EachDaoContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [allProposal, setAllProposal] = useState<IProposal[]>(eachDAOProposal);
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || '';
  const tabs: { title: string; value: string }[] = [
    { value: 'All', title: 'All' },
    { value: 'Active', title: 'Active' },
    { value: 'Pending', title: 'Pending' },
    { value: 'Succeeded', title: 'Executed' },
    { value: 'Failed', title: 'Failed' },
  ];

  const currentTab: string =
    searchParams.get('q') || searchParams.get('filter') || tabs[0].value;
  const {
    proposals,
    isProposalError,
    proposalErrorMessage,
    isLoadingProposal,
  } = useContext(ApiContext);

  console.log(proposals, '-> proposal');

  useEffect(() => {
    if (proposals && !isLoadingProposal) {
      setEachDAOProposal(
        proposals.reverse().map((proposal: IProposal) => {
          return {
            type: proposal.proposalType,
            status: getStatus(proposal),
            description: proposal.description,
            wallet:
              proposal.target.slice(0, 6) + '...' + proposal.target.slice(-4),
            duration: getDuration(proposal.startTime, proposal.endTime),
            totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
            organisation: proposal.daoName,
            id: proposal?.id ? proposal?.id?.toString() : '',
            startTime: proposal.startTime,
            endTime: proposal.endTime,
            daoId: proposal.daoId,
            votesAgainst: proposal.votesAgainst,
            votesFor: proposal.votesFor,
            votes: proposal.votes,
            hasVoted: proposal.hasVoted,
          };
        })
      );
    }
  }, [isLoadingProposal]);

  useEffect(() => {
    setAllProposal(eachDAOProposal);
  }, [eachDAOProposal]);

  const handleFilter = useDebouncedCallback((filterBy: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterBy === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', filterBy);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  console.log(currentTab, '-> proposal');

  useEffect(() => {
    if (search) {
      setAllProposal(
        eachDAOProposal?.filter(
          (item: { wallet: string; type: string }) =>
            item?.wallet?.toLowerCase().includes(search.toLowerCase()) ||
            item?.type?.toLocaleLowerCase()?.includes(search.toLowerCase())
        )
      );
    } else if (filter) {
      setAllProposal(
        eachDAOProposal?.filter((item: { status: string }) =>
          item?.status?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setAllProposal(eachDAOProposal);
    }
  }, [search, filter]);

  if (isLoadingProposal) return <DashboadLoading />;
  if (isProposalError) return <ErrorFetchingComponent />;

  console.log(currentTab, '-> currentTrab');

  return (
    <div className="space-y-8 min-h-[80vh]">
      <div className="justify-between items-center flex">
        <h1
          role="heading"
          className="dark:text-white font-medium text-xl text-dark"
        >
          Proposals
        </h1>
      </div>

      <Tabs
        defaultValue={currentTab}
        className="w-full"
        value={currentTab}
        onValueChange={(value) => handleFilter(value)}
      >
        <TabsList className="w-full justify-start space-x-6 border-b-2 dark:border-b-[#292929] border-[#CCCCCC99]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="w-fit">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <>
          {tabs.map((tab) => (
            <TabsContent
              value={tab.value}
              className="text-[#777777] text-sm font-light"
            >
              <EachFilterTab
                proposalData={allProposal || []}
                search={search}
                filter={filter}
              />
            </TabsContent>
          ))}
        </>
      </Tabs>
    </div>
  );
};

export default Proposals;
