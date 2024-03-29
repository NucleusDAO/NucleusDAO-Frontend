import { OpenDaoIcon, PeopleIcon } from "@/assets/svgs";
import { ReactNode } from "react";
import { DAO_INFO_URL } from "./path";

const DaoTemplateList: {
  title: string;
  description: string;
  href: string;
  status: string;
  color: string;
  icon: ReactNode;
}[] = [
  {
    title: 'Basic DAO',
    description:
      'Equal voting power. Add or remove members via proposal. One wallet, one vote.',
    href: DAO_INFO_URL,
    status: '',
    icon: <PeopleIcon size="40" />,
    color: '#9050E9'
  },
  {
    title: 'Open DAO',
    description: 'Token holders can participate in decision-making processes.',
    href: '#',
    status: 'Coming Soon',
    icon: <OpenDaoIcon />,
    color: '#0080FF'
  },
];

const proposalLists: { title: string; }[] = [
  {
    title: 'Propose a transfer'
  },
  {
    title: 'Propose to add a new member to the group'
  },
  {
    title: 'Propose to remove member from the group'
  },
  {
    title: 'Propose to change voting time'
  },
  {
    title: 'Propose to change the quorum'
  },
  {
    title: 'Other'
  },
]

const proposalSummary: { title: string; desc: string }[ ]= [
  {
      title: 'Title',
      desc: 'Propose a transfer '
  },
  {
      title: 'Description',
      desc: 'I want to propose a token of funds to be transferred to chuks. He needs to vote. '
  },
  {
      title: 'Target Wallet',
      desc: '9xfDAO...ntY897'
  },
  {
      title: 'Value',
      desc: '$120'
  },
  {
      title: 'Duration',
      desc: '3 days'
  },
  {
    title: 'Published by',
    desc: '9xfDAO...ntY897'
},
]

export { DaoTemplateList, proposalLists, proposalSummary };
