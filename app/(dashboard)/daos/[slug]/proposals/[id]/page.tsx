'use client';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import EachProposalView from '@/components/proposals/each-proposal-view';
import { AppContext } from '@/context/app-context';
import { IEachProposalView } from '@/libs/types';
import { cn } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

const EachProposal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tabs: string[] = ['Result', 'Information'];
  const { getEachDAO, getProposal } = useContext(AppContext);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const urlParts = pathname.split('/');
  const [currentProposal, setCurrentProposal] = useState<
    IEachProposalView | any
  >({});

  const currentTab: string = searchParams.get('q') || tabs[0];
  const proposalId = urlParts[4];
  const daoId = urlParts[2];

  useEffect(() => {
    const getSingleProposal = async () => {
      try {
        const dao: { contractAddress: string } = await getEachDAO(daoId);
        const proposal = await getProposal(dao.contractAddress, proposalId);
        setCurrentProposal(proposal);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSingleProposal();
  }, [proposalId]);

  const handleSwitch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#292929] pb-4">
        <h2 className="text-white font-medium text-xl">Proposal</h2>
        <div className="flex space-x-3 bg-[#191919] rounded-lg p-2 items-center text-sm">
          {tabs.map((tab) => (
            <div
              className={cn(
                'p-2 px-4',
                currentTab === tab && 'text-primary rounded-lg bg-[#1E1E1E]'
              )}
              key={tab}
              onClick={() => handleSwitch(tab)}
              role="button"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      {isLoading ? (
        <EachDaoLoading />
      ) : (
        <EachProposalView tabs={tabs} currentProposal={currentProposal} />
      )}
    </div>
  );
};

export default EachProposal;
