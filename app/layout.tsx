import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/themes/theme.provider';
import { Suspense } from 'react';
import { ModeToggle } from '@/components/themes/mode-toggle';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Loading from '@/components/loading';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nucleus DAO',
  description:
    'A home to hundreds of Decentralized Autonomous Organizations on AETERNITY Protocol. Start earning by contributing your skills or supercharge your own community with the power of web3.',
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
            <div className="max-w-[2000px] mx-auto relative">
              <ModeToggle />
              {children}
            </div>
          </Suspense>
          <Sonner richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
