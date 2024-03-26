import { DaoIcon, DashboardIcon, ProposalIcon } from '@/assets/svgs';
import { DAO_URL, DASHBOARD_URL } from '@/config/path';
import { Info, Settings } from 'lucide-react';
import { ReactNode } from 'react';

const topSidebarNav: { href: string; title: string; icon: ReactNode }[] = [
  {
    href: DASHBOARD_URL,
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    href: DAO_URL,
    title: 'DAOs',
    icon: <DaoIcon />,
  },
  {
    href: '#',
    title: 'Proposals',
    icon: <ProposalIcon />,
  },
];

const bottomSidebarNav: { href: string; title: string; icon: ReactNode }[] = [
  {
    href: "#",
    title: 'Settings',
    icon: <Settings size={20} />,
  },
  {
    href: '#',
    title: 'Help Center',
    icon: <Info size={20} />,
  }
];

export { topSidebarNav, bottomSidebarNav };
