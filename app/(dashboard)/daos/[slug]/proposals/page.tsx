'use client';
import EachFilterTab from '@/components/proposals/each-proposal-tab';
import { AppContext } from '@/context/app-context';
import { EachDaoContext } from '@/context/each-dao-context';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const EachDaoProposals = () => {
  const { eachDAOProposal } = useContext(EachDaoContext);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || '';
  const [proposals, setProposals] = useState(eachDAOProposal);

  useEffect(() => {
    if (search) {
      setProposals(eachDAOProposal?.filter((item: { wallet: string; type: string; }) =>  item?.wallet?.toLowerCase().includes(search.toLowerCase()) || item?.type?.toLocaleLowerCase()?.includes(search.toLowerCase())))
    } else if (filter) {
      setProposals(eachDAOProposal?.filter((item: { status: string }) =>  item?.status?.toLowerCase().includes(filter.toLowerCase())))
    } else {
      setProposals(eachDAOProposal);
    }
  }, [search, filter]);

  return (
    <div className="-mt-4">
      <EachFilterTab proposalData={proposals} search={search} filter={filter} />
    </div>
  );
};

export default EachDaoProposals;
