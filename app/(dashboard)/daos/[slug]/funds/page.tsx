'use client'
import { CopyIcon } from '@/assets/svgs';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { columns } from './columns';
import { data } from './data';
import { IConnectWalletContext } from '@/libs/types';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { usePathname } from 'next/navigation';

const EachDaoFunds = () => {
  const pathname = usePathname();
  const domainName = typeof window !== 'undefined' && window.location.origin;
  const { currentDAO } = useContext(AppContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { isConnected } = user;

  const lastIndex = pathname.lastIndexOf('/');
  const updatedUrl = pathname.substring(0, lastIndex);
  console.log(`${domainName}${updatedUrl}`, '->');
  
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center w-[30%] space-y-4 mx-auto mt-[10%]">
          <p className="text-sm font-light text-defaultText">
            Currently, there are no funds in the treasury. You can initiate a
            proposal to make deposit.
          </p>
          {isConnected && <Button>Deposit Token</Button>}
        </div>
      ) : (
        <>
          <div className="dark:bg-[#191919] p-4 space-y-4 rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <p className="text-xs font-light">Total Balance</p>
                <div className="space-y-1.5">
                  <div className="flex space-x-2 items-center">
                    <p className="dark:text-white text-dark font-bold text-2xl">$254.08</p>

                    <div className="flex items-center space-x-2 text-[#1CA013] ">
                      <ChevronUp size={16} />
                      <p className="font-medium text-xs">16.59%</p>
                    </div>
                  </div>
                  <p className="text-[#888888] text-xs font-light">
                    ~0.052693 AE
                  </p>
                </div>
              </div>
              {isConnected && <Button>Deposit Token</Button>}
            </div>
            <div className="flex space-x-1.5 font-light text-xs">
              <p className="dark:text-white font-normal text-dark">
                DAO account name:{' '}
                <span className="text-[#888888]">{`${domainName}${updatedUrl}`}</span>
              </p>
              <CopyIcon size="18" className="cursor-pointer" />
            </div>
          </div>

          <div className="dark:bg-[#191919] p-4 space-y-4 rounded-lg bg-white">
            <h1 className="dark:text-white font-medium text-xl text-dark">
              Transaction details
            </h1>

            <DataTable columns={columns} data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default EachDaoFunds;
