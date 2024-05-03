'use client';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { Globe, MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useContext } from 'react';
import { CopyIcon } from '@/assets/svgs';
import { eachDaoViews } from '@/config/dao-config';
import { cn, encodeURI } from '@/libs/utils';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import { EachDaoContext } from '@/context/each-dao-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected, address } = user;
  const { isLoading, currentDAO } = useContext(EachDaoContext);

  const lastIndex = pathname.lastIndexOf('/');
  const updatedUrl = pathname.substring(0, lastIndex);
  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];

  
  if (isLoading) return <EachDaoLoading />;
  
  const isMember = currentDAO.members.includes(address);


  // console.log(isLoading, '-> isloading')
  
  console.log(currentDAO, '-> currentDAO');

  return (
    <>
    {!isLoading && (
      <div className="">
        <div className="flex justify-between border-b dark:border-b-[#292929] pb-6 border-b-[#CCCCCC99]">
          <div className="md:flex space-x-4 items-center space-y-5 md:space-y-0">
            <div
              className="rounded-lg flex w-fit items-center justify-center p-2 dark:bg-[#1E1E1E] bg-white dark:hover:bg-[#262525] hover:bg-white text-[#444444] dark:text-defaultText"
              role="button"
              onClick={() => router.back()}
            >
              <MoveLeft />
            </div>
            <h1 className="dark:text-white text-dark font-medium text-2xl">
              Explore DAOs
            </h1>
          </div>
          {isConnected && (
            <React.Fragment>
              {isMember && (
                <Link href={`${CREATE_PROPOSAL_URL}?ct=${daoId}`}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Proposal
                  </Button>
                </Link>
              )}
            </React.Fragment>
          )}
        </div>

        <div className="h-[72vh] overflow-auto pt-6 pr-4">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 items-center">
                  <img
                    src={currentDAO.image}
                    alt={currentDAO.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="space-y-4">
                    <h2 className="font-medium text-2xl text-dark dark:text-white">
                      {currentDAO.name}
                    </h2>
                    <Link href="legacy.smartdao.eth" target="_blank">
                      <div className="flex space-x-2 mt-1.5 items-center font-light text-sm text-[#888888]">
                        <p>{currentDAO.domain ?? currentDAO.account}</p>
                        <CopyIcon />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="dark:bg-[#1E1E1E] bg-white p-4 flex items-center justify-center rounded-lg">
                  <Globe
                    className="text-primary dark:text-defaultText"
                    size={22}
                  />
                </div>
              </div>
              <p className="text-[#888888] text-sm">{currentDAO.description}</p>
            </div>
            <div className="pb-4 border-b dark:border-[#292929] md:flex justify-between border-[#CCCCCC99] space-y-4 md:space-y-0">
              <h2 className="font-medium text-2xl dark:text-white text-dark">
                Overview
              </h2>
              <div className="flex space-x-4 dark:bg-[#191919] bg-white p-2 rounded-2xl w-[99%] md:w-fit overflow-x-auto">
                {eachDaoViews.map((view) => (
                  <Link href={encodeURI(updatedUrl, view.path)} key={view.title}>
                    <div
                      role="button"
                      className={cn(
                        'flex space-x-2 text-xs text-[#888888] items-center bg-white dark:bg-[#1E1E1E] rounded-lg font-light py-2 px-3',
                        (pathname.endsWith(view.path) ||
                          pathname.includes(view.path)) &&
                          'text-primary bg-light'
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
    )}
    </>
  );
};

export default Layout;
