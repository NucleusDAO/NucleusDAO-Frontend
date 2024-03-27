'use client';

import { Button } from "../ui/button";

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
        <Button className="bg-[#1E1E1E] text-white" size="sm">Details</Button>
    )
}
