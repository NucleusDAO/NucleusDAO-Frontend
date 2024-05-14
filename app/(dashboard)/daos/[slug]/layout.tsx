'use client';
import { Button } from '@/components/ui/button';
import { CREATE_PROPOSAL_URL } from '@/config/path';
import { Globe, MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { CopyIcon } from '@/assets/svgs';
import { eachDaoViews } from '@/config/dao-config';
import {
  capitalizeFirstLetter,
  cn,
  encodeURI,
  removeExistingStorageItem,
  wait,
} from '@/libs/utils';
import EachDaoLoading from '@/components/loading/each-dao-loading';
import { EachDaoContext } from '@/context/each-dao-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { AppContext } from '@/context/app-context';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { setUpdate } = useContext(AppContext);
  const { isConnected } = user;
  const { isLoading, currentDAO, isMember } = useContext(EachDaoContext);
  const [routing, setRouting] = useState<boolean>(false);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];
  const domainName = typeof window !== 'undefined' && window.location.origin;
  const url = `${domainName}/daos/${daoId}`;

  console.log(currentDAO, '->currentDAO');

  function handleView(path: string) {
    router.push(encodeURI(url, path));
  }

  function handleCreateProposal() {
    setRouting(true);
    removeExistingStorageItem('new_proposal');
    wait().then(() => {
      router.push(`${CREATE_PROPOSAL_URL}?ct=${daoId}`);
      setRouting(false);
    });
  }

  function handlePropose() {
    setRouting(true);
    removeExistingStorageItem('new_proposal');
    wait().then(() => {
      router.push(`${CREATE_PROPOSAL_URL}?ct=${daoId}&enums=10`);
      setRouting(false);
    });
  }

  useEffect(() => {
    setUpdate(false);
  }, []);

  if (isLoading) return <EachDaoLoading />;

  return (
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
              <Button
                onClick={handleCreateProposal}
                loading={routing}
                loadingText="Please wait..."
              >
                <Plus className="mr-2 h-4 w-4" /> Create Proposal
              </Button>
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
                  className="rounded-lg object-cover h-[50px] w-[50px]"
                />
                <div className="space-y-4">
                  <h2 className="font-medium text-2xl text-dark dark:text-white capitalize">
                    {currentDAO.name}
                  </h2>
                  <CopyToClipboard
                    text={currentDAO.domain ?? currentDAO.account}
                    onCopy={() => toast.success('DAO Address copied!')}
                  >
                    <div className="flex space-x-2 mt-1.5 items-center font-light text-sm text-[#888888]">
                      <p>{currentDAO.domain ?? currentDAO.account}</p>
                      <CopyIcon />
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    {!isMember && isConnected && <Button>Join DAO</Button>}
                  </DialogTrigger>
                  <DialogContent className="dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:via-[#1E1E1E]">
                    <DialogHeader>
                      <DialogTitle className="text-white font-medium py-3">
                        Join DAO
                      </DialogTitle>
                      <DialogDescription className="font-light py-2">
                        You have to make a proposal before you can become a
                        member of a DAO. Do you want to make a proposal now?
                      </DialogDescription>
                    </DialogHeader>

                    <Button
                      className="w-full"
                      onClick={handlePropose}
                      loading={routing}
                      loadingText="Please wait..."
                    >
                      Propose
                    </Button>
                  </DialogContent>
                </Dialog>

                <div className="dark:bg-[#1E1E1E] bg-white p-4 flex items-center justify-center rounded-lg">
                  <Globe
                    className="text-primary dark:text-defaultText"
                    size={22}
                  />
                </div>
              </div>
            </div>
            <p className="text-[#888888] text-sm">
              {capitalizeFirstLetter(currentDAO.description)}
            </p>
          </div>
          <div className="pb-4 border-b dark:border-[#292929] md:flex  items-center justify-between border-[#CCCCCC99] space-y-4 md:space-y-0">
            <h2 className="font-medium text-2xl dark:text-white text-dark">
              Overview
            </h2>
            <div className="flex space-x-4 dark:bg-[#191919] bg-white p-2 rounded-2xl w-[99%] md:w-fit overflow-x-auto">
              {eachDaoViews.map((view) => (
                <div
                  role="button"
                  className={cn(
                    'flex space-x-2 text-xs text-[#888888] items-center bg-white dark:bg-[#1E1E1E] rounded-lg font-light py-2 px-3',
                    (pathname.endsWith(view.path) ||
                      pathname.includes(view.path)) &&
                      'text-primary bg-light'
                  )}
                  key={view.title}
                  onClick={() => handleView(view.path)}
                >
                  {view.icon}
                  <p>{view.title}</p>
                </div>
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
