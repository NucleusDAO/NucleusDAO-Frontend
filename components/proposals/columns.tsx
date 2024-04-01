'use client';

import { EachStatus } from "./data";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { encodeURI } from "@/libs/utils";

const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'organisation',
    header: 'Organisations',
    key: 'organisation',
    cell: ({ row }: any) => <OrganisationCell row={row} />,
  },
  {
    accessorKey: 'type',
    header: 'Proposal Type',
    key: 'type',
  },
  {
    accessorKey: 'wallet',
    header: 'Published By',
    key: 'wallet',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    key: 'duration',
  },
  {
    accessorKey: 'totalVote',
    header: 'Votes',
    key: 'totalVote',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    key: 'status',
    cell: ({ row }: any) => <StatusCell row={row} />
  },
  {
    accessorKey: 'action',
    header: 'Action',
    key: 'action',
    cell:  ({ row }: any) => <ActionCell row={row} />,
  },
];

export { columns };

export const OrganisationCell = ({ row }: any) => {
  const { logo, organisation } = row.original;
  return <div className="flex space-x-2 items-center font-medium">{logo} <p>{organisation}</p></div>;
};

export const ActionCell = ({ row }: any) => {
  const { id } = row.original;
  const pathname = usePathname();
    return (
        // <Eye size={18} color="#F5F5F5" role="button" />
        <Link href={encodeURI(pathname, id)}>
          <Button className="bg-[#1E1E1E] text-white" size="sm">Details</Button>
        </Link>
    )
}

export const StatusCell = ({ row }: any) => {
    const { status } = row.original;
    return (
        <div className="w-fit">{EachStatus[status]}</div>
    )
}
