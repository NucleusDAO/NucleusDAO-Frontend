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

export { DaoTemplateList };
