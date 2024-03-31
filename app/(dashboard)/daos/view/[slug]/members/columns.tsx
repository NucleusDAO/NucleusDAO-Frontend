'use client';
import Image from 'next/image';
import AELogo from '@/assets/logos/ae-logo.png';

import { Button } from '@/components/ui/button';
import RoundedIcon from '@/assets/icons/roundedIcon.png';

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
    <Button className="bg-[#1E1E1E] hover:bg-[#262626] text-white" size="sm">
      Delete
    </Button>
  );
};
