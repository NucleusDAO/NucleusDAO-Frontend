'use client';

import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { useContext, useEffect, useState } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { EachDaoContext } from '@/context/each-dao-context';
import { usePathname, useRouter } from 'next/navigation';
import { removeExistingStorageItem } from '@/libs/utils';
import { AppContext } from '@/context/app-context';
import EachDaoLoading from '@/components/loading/each-dao-loading';

interface IData {
  wallet: string;
  proposals: string;
  votes: string;
}

const EachDaoMembers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getUsersActivities, getAllUsersActivities } = useContext(AppContext);
  const { membersActivities, isMember, currentDAO, memberLoading } =
    useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;
  const [data, setData] = useState<IData[]>([]);
  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];

  const getNewProposalInfo =
    typeof window !== 'undefined' && localStorage.getItem('new_proposal');

  const removeExistingProposal = () => {
    if (getNewProposalInfo) {
      localStorage.removeItem('new_proposal');
    }
  };

  useEffect(() => {
    const fetchMembers = async () =>
      await getAllUsersActivities(currentDAO.contractAddress);
    console.log(
      fetchMembers().then((res) => console.log(res)),
      'fetch memebrs'
    );
  }, []);
  console.log(currentDAO, '-> currentDAO');

  useEffect(() => {
    if (membersActivities) {
      setData(
        membersActivities.map((member: any) => {
          return {
            wallet: member.account,
            proposals: member.proposalsCreated.toString(),
            votes: member.voteCasted.toString(),
          };
        })
      );
    }
  }, [membersActivities]);

  if (memberLoading) return <EachDaoLoading />;

  return (
    <div className="space-y-4 dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E] dark:to-[#252525] p-4 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <h1 className="dark:text-white text-dark font-medium text-xl">
          Members
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            {isConnected && isMember && <Button>Add Member</Button>}
          </DialogTrigger>
          <DialogContent className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E]">
            <DialogHeader>
              <DialogTitle className="text-white font-medium py-3">
                Add Member
              </DialogTitle>
              <DialogDescription className="font-light py-2">
                You have to make a proposal before you can add members to the
                DAO. Do you want to make a proposal now?
              </DialogDescription>
            </DialogHeader>

            <Button
              className="w-full"
              onClick={() => {
                removeExistingStorageItem('new_proposal');
                router.push(`${CREATE_PROPOSAL_URL}?ct=${daoId}&enums=1`);
              }}
            >
              Propose
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EachDaoMembers;
