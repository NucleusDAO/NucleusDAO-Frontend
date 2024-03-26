import { DaoIcon } from '@/assets/svgs';
import Image from 'next/image';
import { ReactNode } from 'react';
import LegacyLogo from '@/assets/logos/legacy.png';
import KrypLogo from '@/assets/logos/kryp.png';
import CocacolaLogo from '@/assets/logos/cocacola.png';
import CreativesLogo from '@/assets/logos/creatives-dao.png';

const dashboardFeedsData: { title: string; value: number; icon: ReactNode }[] =
  [
    {
      title: 'DAOs Joined',
      value: 10,
      icon: <DaoIcon size="34" />,
    },
    {
      title: 'Total Votes',
      value: 223,
      icon: <DaoIcon size="34" />,
    },
    {
      title: 'Total Proposals',
      value: 50,
      icon: <DaoIcon size="34" />,
    },
  ];

const dashboardTableData: { organisation: string; activeMember: string; activeProposal: string; votes: string; orgIcon: ReactNode; }[] = [
  {
    organisation: 'Legacy',
    orgIcon: <Image src={LegacyLogo} alt="legacy logo" width={28} />,
    activeMember: '26K',
    activeProposal: '5(4)',
    votes: '23',
  },
  {
    organisation: 'Kryptokrauts',
    orgIcon: <Image src={KrypLogo} alt="legacy logo" width={28} />,
    activeMember: '20K',
    activeProposal: '5(4)',
    votes: '23',
  },
  {
    organisation: 'Cocacola',
    orgIcon: <Image src={CocacolaLogo} alt="legacy logo" width={28} />,
    activeMember: '16K',
    activeProposal: '5(4)',
    votes: '20',
  },
  {
    organisation: 'CreativesDao',
    orgIcon: <Image src={CreativesLogo} alt="legacy logo" width={28} />,
    activeMember: '26K',
    activeProposal: '5(4)',
    votes: '23=',
  },
  {
    organisation: 'Legacy',
    orgIcon: <Image src={LegacyLogo} alt="legacy logo" width={28} />,
    activeMember: '24K',
    activeProposal: '5(4)',
    votes: '23',
  },
  {
    organisation: 'CreativesDao',
    orgIcon: <Image src={CreativesLogo} alt="legacy logo" width={28} />,
    activeMember: '16K',
    activeProposal: '5(4)',
    votes: '12',
  },
  {
    organisation: 'Kryptokrauts',
    orgIcon: <Image src={KrypLogo} alt="legacy logo" width={28} />,
    activeMember: '6K',
    activeProposal: '5(4)',
    votes: '23',
  },
];

export { dashboardFeedsData, dashboardTableData };
