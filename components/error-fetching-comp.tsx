'use client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';
import { DAO_URL } from '@/config/path';
import React from 'react';
import DashboadLoading from './loading/dashboard-loading';
import { TriangleAlert } from 'lucide-react';

const ErrorFetchingComponent = ({
  className,
  title,
  description,
  handleRefetch,
}: {
  className?: string;
  title?: string;
  description?: string;
  handleRefetch?: () => void;
}) => {
  const router = useRouter();
  return (
    <React.Fragment>
      {title?.includes('Contract not found (not_present)') ? (
        <div className="space-y-4">
          <div className="text-sm font-light bg-primary rounded-lg px-2 py-4 text-white flex items-start space-x-2">
            <TriangleAlert strokeWidth={1} size={20} />
            <p>
              Please switch your Superhero Wallet network to the appropriate one before you can access and view the DAO and its proposals. If you're currently
              on the mainnet, please switch to the testnet. If you're on the testnet, switch to the mainnet to access the desired features.
            </p>
          </div>
          <DashboadLoading />
        </div>
      ) : (
        <div className={cn('min-h-[80vh] w-full p-8', className)}>
          <div className="w-[90%] space-y-4 font-light text-sm">
            <h1 className="dark:text-white text-dark text-[28px] leading-9">This view can’t be reached</h1>
            {description === 'Invocation failed: "Maps: Key does not exist"' ? (
              <p>The DAO could not be found.</p>
            ) : (
              <p>We cannot connect to the smart contract at the moment</p>
            )}
            <p>{description}</p>
            <p>Try the following help:</p>
            <p>1. Switch your network on SuperHero Wallet</p>
            <p>2. Try again later.</p>
            <p>3. Check your network connection.</p>
            <p onClick={() => router.push(DAO_URL)}>
              4. Click{' '}
              <span className="text-primary" role="button">
                here
              </span>{' '}
              to go home
            </p>
            <p>5. If you're connected but facing firewall restrictions, ensure Firefox has the necessary permissions to access the internet.</p>
            {description === 'Invocation failed: "Maps: Key does not exist"' ? (
              <Button className="" onClick={() => router.push(DAO_URL)}>
                Go home!
              </Button>
            ) : (
              <Button
                className=""
                onClick={() => {
                  router.refresh();
                  handleRefetch && handleRefetch();
                }}
              >
                Try again!
              </Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ErrorFetchingComponent;
