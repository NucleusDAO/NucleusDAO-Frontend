import ProposalCreationChain from '@/assets/icons/feature-chain.png';
import DaoCreationChain from '@/assets/icons/dao-creation-feature-chain.png';
import DaoTresuryChain from '@/assets/icons/dao-treasury-feature-chain.png';
import VotingMechanismChain from '@/assets/icons/voting-mechanism-feature-chain.png';
import { StaticImageData } from "next/image";
import ProposalCreationBackground from '@/assets/images/each-feature-bg.png';
import VotingMechanismBackground from '@/assets/images/each-feature-2-bg.png';
import DaoTreasuryBackground from '@/assets/images/each-feature-3-bg.png';
import DaoCreationBackground from '@/assets/images/each-feature-4-bg.png';

export const navLinks: { title: string; href: string }[] = [
  {
    title: 'About',
    href: '#',
  },
  {
    title: 'How it Works',
    href: '#',
  },
  {
    title: 'Features',
    href: '#',
  },
  {
    title: 'Contact Us',
    href: '#',
  },
];

export const content = [
  {
      background: ProposalCreationBackground,
      heading: 'New Proposal',
      title: 'Proposal Creation',
      description: 'Members can propose initiatives, changes, or actions within the DAO, initiating the decision-making process.'
  },
  {
      background: VotingMechanismBackground,
      heading: '',
      title: 'Voting Mechanism',
      description: 'Members can participate in decision-making processes by casting votes on proposed actions or initiatives within the DAO.'
  },
  {
      background: DaoTreasuryBackground,
      heading: '',
      title: 'DAO Treasury',
      description: "Each DAO has its own Treasury which is managed by the DAO's members. Members can monitor all DAO metrics"
  },
  {
      background: DaoCreationBackground,
      heading: '',
      title: 'DAO Creation',
      description: 'Provide supplementary DAO information—like display picture, subdomain, description, and KYC details—and deploy the DAO.'
  },
];

export const contentChain: { title: string; description: string; classNames: string, chain: StaticImageData }[] = [
  {
      title: 'Proposal Creation',
      description: 'It enables members to propose initiatives.',
      classNames: '-top-20',
      chain: ProposalCreationChain
  },
  {
      title: 'Voting Mechanism',
      description: 'Easily cast votes securely.',
      classNames: '-top-10 -right-[192px]',
      chain: VotingMechanismChain
  },
  {
      title: 'DAO Creation',
      description: 'Customize and deploy DAOs',
      classNames: 'bottom-1 -left-[230px]',
      chain: DaoCreationChain
  },
  {
      title: 'DAO Treasury',
      description: 'DAO has its own Treasury.',
      classNames: 'bottom-1 -right-[230px]',
      chain: DaoTresuryChain
  },
];