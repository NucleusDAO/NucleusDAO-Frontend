'use client';

import { Eye } from "lucide-react";

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
    accessorKey: 'activeMember',
    header: 'Active Members',
    key: 'activeMember',
  },
  {
    accessorKey: 'activeProposal',
    header: 'Proposals (Active)',
    key: 'activeProposal',
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
    cell:  ({ row }: any) => <ActionCell />,
  },
];

export { columns };

export const OrganisationCell = ({ row }: any) => {
  const { orgIcon, organisation } = row.original;
  return <div className="flex space-x-2 items-center font-medium">{orgIcon} <p>{organisation}</p></div>;
};

export const ActionCell = () => {
    return (
      <Eye size={18} color="#F5F5F5" role="button" />
    )
}
