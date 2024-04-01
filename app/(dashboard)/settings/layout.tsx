'use client';
import { Bell2, DisplayIcon, OnePersonicon } from '@/assets/svgs';
import {
  SETTINGS_DISPLAY_URL,
  SETTINGS_NOTIFICATIONS_URL,
  SETTINGS_URL,
} from '@/config/path';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export const daoSettingsSidebarLinks: {
  title: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    title: 'My Profile',
    icon: <OnePersonicon />,
    href: SETTINGS_URL,
  },
  {
    title: 'Notifications',
    icon: <Bell2 width="23" height="26" />,
    href: SETTINGS_NOTIFICATIONS_URL,
  },
  {
    title: 'Display',
    icon: <DisplayIcon />,
    href: SETTINGS_DISPLAY_URL,
  },
];

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <h1 className="text-white text-xl font-medium">Settings</h1>
      <div className="flex justify-between items-start space-x-4">
        <div className="w-[20%] bg-[#191919] rounded-lg p-4">
          <div className="space-y-6 text-[#888888] text-sm">
            {daoSettingsSidebarLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div
                  className={cn(
                    'py-2 rounded-lg px-3 flex font-light items-center space-x-2 my-4',
                    pathname === link.href && 'bg-[#1E1E1E] text-white'
                  )}
                >
                  <div>{link.icon}</div>
                  <p>{link.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[80%] bg-[#191919] rounded-lg p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
