'use client';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL, DAO_URL } from '@/config/path';
import { Globe, MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { AppContext, IProposal } from '@/context/app-context';
import { CopyIcon } from '@/assets/svgs';
import { eachDaoViews } from '@/config/dao-config';
import { cn, encodeURI, getStatus } from '@/libs/utils';
import { toast } from 'sonner';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import { getDaoInfo } from './get-dao-info';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const isJoined: boolean = true;
  const {
    currentDAO,
    getProposals,
    setCurrentDAO,
    getEachDAO,
    setEachDAOProposal,
  } = useContext(AppContext);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const secondParts = urlParts[2];

  const lastIndex = pathname.lastIndexOf('/');
  const updatedUrl = pathname.substring(0, lastIndex);

  useEffect(() => {
    (async () => {
      try {
        const daoId = 'Hexdee DAO' || secondParts;
        if (daoId) {
          const dao = await getEachDAO(daoId);
          setCurrentDAO(dao);
          await getProposals(dao.contractAddress).then((proposals: IProposal[]) => {
            console.log(proposals, '-> proposal')
            setEachDAOProposal(
              proposals.map((proposal: IProposal) => {
                return {
                  type: proposal.proposalType,
                  status: getStatus(proposal),
                  description: proposal.description,
                  wallet:
                    proposal.target.slice(0, 6) +
                    '...' +
                    proposal.target.slice(-4),
                  duration: new Date().toLocaleDateString('en-Gb', {
                    day: 'numeric',
                  }),
                  totalVote: `${proposal.votesFor} + ${proposal.votesAgainst}`,
                  organisation: dao.name,
                  id: proposal.id.toString(),
                };
              })
            );
          });
        } else {
          router.back();
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
        console.error('Error fetching DAO:', error);
      }
    })();
  }, []);

  if (isLoading) return <EachDaoLoading />;

  return (
    <div className="">
      <div className="flex justify-between border-b dark:border-b-[#292929] pb-6 border-b-[#CCCCCC99]">
        <div className="md:flex space-x-4 items-center space-y-5 md:space-y-0">
          <div
            className="rounded-lg flex w-fit items-center justify-center p-2 dark:bg-[#1E1E1E] bg-white dark:hover:bg-[#262525] hover:bg-white text-[#444444] dark:text-defaultText"
            role="button"
            onClick={() => router.push(DAO_URL)}
          >
            <MoveLeft />
          </div>
          <h1 className="dark:text-white text-dark font-medium text-2xl">
            Explore DAOs
          </h1>
        </div>
        {isJoined ? (
          <Link href={CREATE_PROPOSAL_URL}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Proposal
            </Button>
          </Link>
        ) : (
          <Button>Join DAO</Button>
        )}
      </div>

      <div className="h-[72vh] overflow-auto pt-6 pr-4">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 items-center">
                <img
                  src={currentDAO.image}
                  alt="legacy logo"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="space-y-4">
                  <h2 className="font-medium text-2xl text-dark dark:text-white">
                    {currentDAO.name}
                  </h2>
                  <Link href="legacy.smartdao.eth" target="_blank">
                    <div className="flex space-x-2 mt-1.5 items-center font-light text-sm text-[#888888]">
                      <p>{currentDAO.domain ?? currentDAO.account}</p>
                      <CopyIcon />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="dark:bg-[#1E1E1E] bg-white p-4 flex items-center justify-center rounded-lg">
                <Globe
                  className="text-primary dark:text-defaultText"
                  size={22}
                />
              </div>
            </div>
            <p className="text-[#888888] text-sm">{currentDAO.description}</p>
          </div>
          <div className="pb-4 border-b dark:border-[#292929] md:flex justify-between border-[#CCCCCC99] space-y-4 md:space-y-0">
            <h2 className="font-medium text-2xl dark:text-white text-dark">
              Overview
            </h2>
            <div className="flex space-x-4 dark:bg-[#191919] bg-white p-2 rounded-2xl w-[99%] md:w-fit overflow-x-auto">
              {eachDaoViews.map((view) => (
                <Link href={encodeURI(updatedUrl, view.path)} key={view.title}>
                  <div
                    role="button"
                    className={cn(
                      'flex space-x-2 text-xs text-[#888888] items-center bg-white dark:bg-[#1E1E1E] rounded-lg font-light py-2 px-3',
                      (pathname.endsWith(view.path) ||
                        pathname.includes(view.path)) &&
                        'text-primary bg-light'
                    )}
                  >
                    {view.icon}
                    <p>{view.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
