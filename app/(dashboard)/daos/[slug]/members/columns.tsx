'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { removeExistingStorageItem } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'account',
    header: 'Wallet Address',
    key: 'wallet',
    cell: ({ row }: any) => <WalletAddressCell row={row} />,
  },
  {
    accessorKey: 'proposalsCreated',
    header: 'Proposals Created',
    key: 'proposalsCreated',
    cell: ({ row }: any) => (
      <p className="text-center">{row.original.proposalsCreated}</p>
    ),
  },
  {
    accessorKey: 'proposalsExecuted',
    header: 'Proposals Executed',
    key: 'proposalsExecuted',
    cell: ({ row }: any) => (
      <p className="text-center">{row.original.proposalsExecuted}</p>
    ),
  },
  {
    accessorKey: 'voteCasted',
    header: 'Votes Casted',
    key: 'voteCasted',
    cell: ({ row }: any) => (
      <p className="text-center">{row.original.voteCasted}</p>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    key: 'action',
    cell: ({ row }: any) => <ActionCell row={row} />,
  },
];

export { columns };

export const WalletAddressCell = ({ row }: any) => {
  const { account } = row.original;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div className="flex space-x-2 items-center w-[25vw]">
      <img
        src={`https://avatars.z52da5wt.xyz/${account}`}
        alt="logo"
        className="rounded-full h-6 w-6"
      />

      <p>
        {account.slice(0, isDesktop ? 14 : 5) +
          '...' +
          account.slice(isDesktop ? -8 : -2)}
      </p>
    </div>
  );
};

export const ActionCell = ({ row }: any) => {
  const router = useRouter();
  const { isMember, currentDAO } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;
  const { account } = row.original;

  return (
    <div className="text-center">
      {isConnected && isMember ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-[#1E1E1E] hover:bg-[#262626] text-white rounded-full"
              size="sm"
              variant="destructive"
            >
              <Trash2 size={18} strokeWidth={1} />
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-[#191919] bg-light">
            <DialogHeader>
              <DialogTitle className="dark:text-white font-medium py-3 text-dark">
                Remove Member
              </DialogTitle>
              <DialogDescription className="font-light py-2">
                You have to make a proposal before you can remove members from
                the DAO. Do you want to make a proposal now?
              </DialogDescription>
            </DialogHeader>

            <div
              onClick={() => {
                removeExistingStorageItem('new_proposal');
                router.push(
                  `${CREATE_PROPOSAL_URL}?ct=${currentDAO.id}&enums=2&address=${account}`
                );
              }}
            >
              <Button className="w-full">Propose</Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        '-'
      )}
    </div>
  );
};
