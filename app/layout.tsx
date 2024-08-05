import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/globals.css';
import { ConnectWalletProvider } from '@/context/connect-wallet-context';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { ThemeProvider } from '@/components/themes/theme.provider';
import { Toaster as Sonner } from '@/components/ui/sonner';
import TanstackProvider from '@/context/tanstack-provider';
import 'aos/dist/aos.css';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NucleusDAO',
  description:
    'NucleusDAO is a platform revolutionising decentralised governance on the æternity blockchain, empowering communities to make transparent decisions and shape the future together.',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <ConnectWalletProvider>
              <TanstackProvider>
                <div className="">{children}</div>
              </TanstackProvider>
            </ConnectWalletProvider>
          </Suspense>
          <Sonner richColors duration={2000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
