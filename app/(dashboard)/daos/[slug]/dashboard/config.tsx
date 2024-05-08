import { CoinIcon, MemebersIcon, ProposalIcon } from '@/assets/svgs';
import { ReactNode } from 'react';
import { DaoFunds } from './component/dao-fund';
import { DaoProposals } from './component/dao-proposals-summary';
import { DaoMembers } from './component/dao-members-summary';

interface ITabView {
  [key: string]: ReactNode;
}

interface IDashboardTab {
  aeAmount: number;
  usdAmount: number;
  totalProposals: number;
  totalMembers: number;
}

const dashboardTab = ({
  aeAmount = 0,
  usdAmount = 0,
  totalProposals,
  totalMembers,
}: IDashboardTab): {
  title: string;
  id: string;
  amount: number;
  value?: string;
  increase: string;
  icon: ReactNode;
}[] => [
  {
    title: 'Dao Funds',
    id: '01',
    amount: usdAmount,
    value: `~ ${aeAmount} AE`,
    increase: '16.59%',
    icon: <CoinIcon size="32" />,
  },
  {
    title: 'Proposals',
    amount: totalProposals,
    id: '02',
    increase: '16.59%',
    icon: <ProposalIcon size="32" />,
  },
  {
    title: 'Members',
    amount: totalMembers,
    id: '03',
    increase: '16.59%',
    icon: <MemebersIcon size="32" />,
  },
];

const tabView: ITabView = {
  0: <DaoFunds />,
  1: <DaoProposals />,
  2: <DaoMembers />,
};

export { dashboardTab, tabView };
