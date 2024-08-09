import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your dashboard',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
