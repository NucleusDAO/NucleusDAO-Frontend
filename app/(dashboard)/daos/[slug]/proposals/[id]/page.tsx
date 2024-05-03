'use client';
import EachProposalView from '@/components/proposals/each-proposal-view';
import { AppContext } from '@/context/app-context';
import { EachDaoContext } from '@/context/each-dao-context';
import { cn } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const EachProposal = () => {
  const router = useRouter();
  const { currentDAO, eachDAOProposal } = useContext(EachDaoContext);
    const tabs: string[] = ['Result', 'Information'];
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const urlParts = pathname.split('/'); // Split the URL by "/"
    const proposalId = urlParts[4];
    const currentProposal =  eachDAOProposal.find((proposal: { id: string }) => proposal.id === proposalId)

    // useEffect(() => {
    //   const getProposal = async () => {
    //     if (proposalId) {
    //       const proposal = await getEachProposal(Number(proposalId));
    //       console.log(proposal, '->')
    //     } else {
    //       router.back();
    //     }
    //   };
    //   getProposal()
    // }, [proposalId]);
  
    console.log(eachDAOProposal, '-> eachDAOProposal')
    console.log(currentProposal, '-> current proposal')
  
    const currentTab: string = searchParams.get('q') || tabs[0];
  
    const handleSwitch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
  
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
      <EachProposalView tabs={tabs} currentProposal={currentProposal} />
    </div>
  );
};

export default EachProposal;
