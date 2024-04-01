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
      <Image src={RoundedIcon} alt="waller" width={24} />
      <p>{wallet}</p>
    </div>
  );
};

export const ActionCell = ({ row }: any) => {
  const { id } = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#1E1E1E] hover:bg-[#262626] text-white"
          size="sm"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#191919]">
        <DialogHeader>
          <DialogTitle className="text-white font-medium py-3">
            Remove Member
          </DialogTitle>
          <DialogDescription className="font-light py-2">
            You have to make a proposal before you can remove members from the
            DAO. Do you want to make a proposal now?
          </DialogDescription>
        </DialogHeader>

        <Link href={CREATE_PROPOSAL_URL}>
          <Button className="w-full">Propose</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
