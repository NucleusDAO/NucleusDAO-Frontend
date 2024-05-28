'use client';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Link from 'next/link';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { removeExistingStorageItem } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import { useRouter } from 'next/navigation';

const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'wallet',
    header: 'Wallet Address',
    key: 'wallet',
    cell: ({ row }: any) => <WalletAddressCell row={row} />,
  },
  {
    accessorKey: 'proposals',
    header: 'Proposals',
    key: 'proposals',
  },
  {
    accessorKey: 'votes',
    header: 'Votes',
    key: 'votes',
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
  const { wallet } = row.original;
  return (
    <div className="flex space-x-2 items-center w-[25vw]">
      <img
        src={`https://avatars.z52da5wt.xyz/${wallet}`}
        alt="logo"
        className="rounded-full h-6 w-6"
      />

      <p>{wallet.slice(0, 14) + '...' + wallet.slice(-8)}</p>
    </div>
  );
};

export const ActionCell = ({ row }: any) => {
  const router = useRouter();
  const { isMember, currentDAO } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;
  const { id, wallet } = row.original;

  return (
    <>
      {isConnected && isMember ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-[#1E1E1E] hover:bg-[#262626] text-white"
              size="sm"
            >
              Delete
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
                  `${CREATE_PROPOSAL_URL}?ct=${currentDAO.id}&enums=2&address=${wallet}`
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
    </>
  );
};
