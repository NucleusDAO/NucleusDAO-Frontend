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
import Link from 'next/link';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { useContext, useEffect, useState } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { EachDaoContext } from '@/context/each-dao-context';

interface IData {
  wallet: string;
  proposals: string;
  votes: string;
}

const EachDaoMembers = () => {
  const { membersActivities, isLoading } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    if (membersActivities) {
      setData(
        membersActivities.map((member: any) => {
          return {
            wallet: member.address,
            proposals: member.proposalsCreated.toString(),
            votes: member.voteCasted.toString(),
          };
        })
      );
    }
  }, [membersActivities]);

  return (
    <div className='space-y-4 bg-[#1E1E1E] p-4 rounded-lg'>
      <div className='flex justify-between items-center'>
        <h1 className='dark:text-white text-dark font-medium text-xl'>
          Transaction details
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            {isConnected && <Button>Add Member</Button>}
          </DialogTrigger>
          <DialogContent className='bg-[#191919]'>
            <DialogHeader>
              <DialogTitle className='text-white font-medium py-3'>
                Add Member
              </DialogTitle>
              <DialogDescription className='font-light py-2'>
                You have to make a proposal before you can add members to the
                DAO. Do you want to make a proposal now?
              </DialogDescription>
            </DialogHeader>

            <Link href={`${CREATE_PROPOSAL_URL}?enums=1`}>
              <Button className='w-full'>Propose</Button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EachDaoMembers;
