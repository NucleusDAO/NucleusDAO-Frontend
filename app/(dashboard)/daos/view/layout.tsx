'use client';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const isJoined: boolean = true;
  return (
    <div className="space-y-8">
      <div className="flex justify-between border-b border-b-[#292929] pb-6">
        <div
          className="flex space-x-4 items-center"
          onClick={() => router.back()}
        >
          <div
            className="bg-[#1E1E1E] rounded-lg flex items-center justify-center p-2"
            role="button"
          >
            <MoveLeft />
          </div>
          <h1 className="text-white font-medium text-2xl">Explore DAOs</h1>
        </div>
        {isJoined ? (
            <Link href={CREATE_PROPOSAL_URL}>
          <Button><Plus className="mr-2 h-4 w-4" /> Create Proposal</Button>
            </Link>
        ) : (
          <Button>Join DAO</Button>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
