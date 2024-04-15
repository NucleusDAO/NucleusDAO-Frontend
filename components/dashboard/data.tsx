import { DaoIcon } from '@/assets/svgs';
import Image from 'next/image';
import { ReactNode } from 'react';
import LegacyLogo from '@/assets/logos/legacy.png';
import KrypLogo from '@/assets/logos/kryp.png';
import CocacolaLogo from '@/assets/logos/cocacola.png';
import CreativesLogo from '@/assets/logos/creatives-dao.png';

const dashboardFeedsData = (connected: boolean): { title: string; value: number; icon: ReactNode }[] =>
  [
    {
      title: 'DAOs Joined',
      value: connected ? 10 : 0,
      icon: <DaoIcon size="34" />,
    },
    {
      title: 'Total Votes',
      value: connected ? 223 : 0,
      icon: <DaoIcon size="34" />,
    },
    {
      title: 'Total Proposals',
      value: connected ? 50 : 0,
      icon: <DaoIcon size="34" />,
    },
  ];

const dashboardTableData = (width: number) => [
  {
    organisation: 'Legacy',
    orgIcon: <Image src={LegacyLogo} alt="legacy logo" width={width} />,
    activeMember: '26K',
    activeProposal: '5(4)',
    description: 'Legacy is a Decentralized Autonomous organization that aims to empower people and make the world a better place.',
    votes: '23',
    url: 'https://smart-dao.vercel.app/daos/legacy',
  },
  {
    organisation: 'Kryptokrauts',
    orgIcon: <Image src={KrypLogo} alt="legacy logo" width={width} />,
    activeMember: '20K',
    activeProposal: '5(4)',
    description: 'We believe in a decentralized future powered by blockchain! We are testing the DAO functionality for kryptokrauts.',
    votes: '23',
    url: 'https://smart-dao.vercel.app/daos/legacy',
  },
  {
    organisation: 'Cocacola',
    orgIcon: <Image src={CocacolaLogo} alt="legacy logo" width={width} />,
    activeMember: '16K',
    activeProposal: '5(4)',
    description: 'We believe in a decentralized future powered by blockchain! We are testing the DAO functionality for kryptokrauts.',
    url: 'https://smart-dao.vercel.app/daos/legacy',
    votes: '20',
  },
  {
    organisation: 'CreativesDao',
    orgIcon: <Image src={CreativesLogo} alt="legacy logo" width={width} />,
    activeMember: '26K',
    activeProposal: '5(4)',
    description: 'The CreativesDAO is an overarching body for all creative contributors in the NEAR ecosystem.',
    url: 'https://smart-dao.vercel.app/daos/legacy',
    votes: '23=',
  },
  {
    organisation: 'Legacy',
    orgIcon: <Image src={LegacyLogo} alt="legacy logo" width={width} />,
    activeMember: '24K',
    description: 'We believe in a decentralized future powered by blockchain! We are testing the DAO functionality for kryptokrauts.',
    url: 'https://smart-dao.vercel.app/daos/legacy',
    activeProposal: '5(4)',
    votes: '23',
  },
  {
    organisation: 'CreativesDao',
    orgIcon: <Image src={CreativesLogo} alt="legacy logo" width={width} />,
    activeMember: '16K',
    description: 'The CreativesDAO is an overarching body for all creative contributors in the NEAR ecosystem.',
    url: 'https://smart-dao.vercel.app/daos/legacy',
    activeProposal: '5(4)',
    votes: '12',
  },
  {
    organisation: 'Kryptokrauts',
    orgIcon: <Image src={KrypLogo} alt="legacy logo" width={width} />,
    activeMember: '6K',
    description: 'We believe in a decentralized future powered by blockchain! We are testing the DAO functionality for kryptokrauts.',
    activeProposal: '5(4)',
    url: 'https://smart-dao.vercel.app/daos/legacy',
    votes: '23',
  },
];

export { dashboardFeedsData, dashboardTableData };
