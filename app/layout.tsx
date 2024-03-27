import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/globals.css';
import RootLayoutsComponent from '@/components/root-layout';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NucleusDAO',
  description:
    'NucleusDAO is a cutting-edge platform revolutionizing decentralized governance on the æternity blockchain, empowering communities to make transparent decisions and shape the future together.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/nucleusdao-purple.svg',
        href: '/nucleusdao-purple.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/nucleusdao-purple.svg',
        href: '/nucleusdao-purple.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="Decentralized Autonomous Organization, Blockchain, Smart Contracts, Web 3"
        />
        <meta name="author" content="Nucleus DAO" />
      </head>
      <body className={rubik.className}>
        <RootLayoutsComponent>{children}</RootLayoutsComponent>
      </body>
    </html>
  );
}
