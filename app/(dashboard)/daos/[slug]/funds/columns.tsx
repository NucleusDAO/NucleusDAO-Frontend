'use client';
import Image from "next/image";
import AELogo from '@/assets/logos/ae-logo.png';

import { ArrowUpFromLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, encodeURI } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { EachStatus2 } from '@/components/proposals/data';
import { ImportIcon } from '@/assets/svgs';

const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'transactionType',
    header: 'Transaction Type',
    key: 'transactionType',
    cell: ({ row }: any) => <TransactionTypeCell row={row} />,
  },
  {
    accessorKey: 'token',
    header: 'Token',
    key: 'token',
    cell: ({ row }: any) => <Image src={AELogo} alt="ae logo" width={24} />
  },
  {
    accessorKey: 'amountInAE',
    header: 'Amount (AE)',
    key: 'amountInAE',
  },
  {
    accessorKey: 'amountInUSD',
    header: 'Amount (USD)',
    key: 'amountInUSD',
  },
  {
    accessorKey: 'from',
    header: 'From',
    key: 'from',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    key: 'date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    key: 'status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
];

export { columns };

export const TransactionTypeCell = ({ row }: any) => {
  const { logo, transactionType } = row.original;
  return (
    <div className="flex space-x-2 items-center">
      <div className={cn('rounded-md p-1.5', transactionType === 'Deposit' ? 'bg-[#C9FDC5]' : 'bg-[#FDC5D0]')}>{transactionType === 'Deposit' ? <ImportIcon /> : <ArrowUpFromLine size={16} color='#A0132D' />}</div>
      <p>{transactionType}</p>
    </div>
  );
};

export const ActionCell = ({ row }: any) => {
  const { id } = row.original;
  const pathname = usePathname();
  return (
    // <Eye size={18} color="#F5F5F5" role="button" />
    <Link href={encodeURI(pathname, id)}>
      <Button className="bg-[#1E1E1E] text-white" size="sm">
        Details
      </Button>
    </Link>
  );
};

export const StatusCell = ({ row }: any) => {
  const { status } = row.original;
  return <div className="w-fit">{EachStatus2[status]}</div>;
};
