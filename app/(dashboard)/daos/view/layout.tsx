'use client';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL, DAO_URL } from '@/config/path';
import { Globe, MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import LegacyLogo from '@/assets/logos/legacy.png';
import { CopyIcon } from '@/assets/svgs';
import Image from 'next/image';
import { eachDaoViews } from '@/config/dao-config';
import { cn, encodeURI } from '@/libs/utils';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const pathname = usePathname();
  const isJoined: boolean = true;

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const updatedUrlParts = urlParts.length > 5 ? urlParts.slice(0, -2) : urlParts.slice(0, -1) // Remove the last element from the array
  const updatedUrl = updatedUrlParts.join('/'); // Join the array back into a string

  return (
    <div className="">
      <div className="flex justify-between border-b border-b-[#292929] pb-6">
        <div
          className="flex space-x-4 items-center"
          onClick={() => router.push(DAO_URL)}
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
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Proposal
            </Button>
          </Link>
        ) : (
          <Button>Join DAO</Button>
        )}
      </div>

      <div className='h-[73vh] overflow-auto pt-6 pr-4'>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 items-center">
                <Image src={LegacyLogo} alt="legacy logo" width={60} />
                <div className="space-y-4">
                  <h2 className="font-medium text-2xl text-white">Legacy</h2>
                  <Link href="legacy.smartdao.eth" target="_blank">
                    <div className="flex space-x-2 mt-1.5 items-center text-sm text-[#888888] font-light">
                      <p>legacy.smartdao.eth</p>
                      <CopyIcon />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-[#1E1E1E] p-4 flex items-center justify-center rounded-lg">
                <Globe />
              </div>
            </div>
            <p className="text-[#888888] text-sm">
              Legacy is a Decentralized Autonomous organization that aims to
              empower people and make the world a better place. Join us on our
              journey to a more decentralized future. Vote to contribute and
              revolutionize Assets.
            </p>
          </div>
          <div className="pb-4 border-b border-[#292929] flex justify-between">
            <h2 className="font-medium text-2xl text-white">Overview</h2>
            <div className="flex space-x-4 bg-[#191919] p-2 rounded-2xl">
              {eachDaoViews.map((view) => (
                <Link href={encodeURI(updatedUrl, view.path)} key={view.title}>
                  <div
                    role="button"
                    className={cn(
                      'flex space-x-2 text-sm text-[#888888] items-center bg-[#1E1E1E] rounded-lg font-light py-2 px-3',
                      (pathname.endsWith(view.path) || pathname.includes(view.path) ) && 'text-primary',
                    )}
                  >
                    {view.icon}
                    <p>{view.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
