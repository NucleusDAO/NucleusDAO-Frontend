import '@/styles/globals.css';
import RootLayoutsComponent from '@/components/root-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutsComponent>{children}</RootLayoutsComponent>;
}

// import { HOME_URL } from '@/config/path';
// import { redirect } from 'next/navigation';

// export default function Dashboard() {
//   redirect(HOME_URL);
// }
