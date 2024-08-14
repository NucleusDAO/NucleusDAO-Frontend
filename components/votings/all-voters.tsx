'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import React, { useContext, useState } from 'react';
import EmptyDAO from '@/assets/icons/empty-icon.png';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';

interface IAllVoters {
  voters: { account: string; support: boolean }[];
}

const AllVoters = ({ voters }: IAllVoters) => {
  const [list, setList] = useState<number>(3);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);

  return (
    <div className="space-y-4">
      <div className="flex justify-between font-light text-defaultText border-b dark:border-[#1E1E1E] pb-4 border-[#CCCCCC99]">
        <p role="heading">Wallet address</p>
        <p role="heading">Type</p>
      </div>
      {voters.length > 0 ? (
        <div className="space-y-8 max-h-[400px] overflow-auto">
          {voters
            ?.slice(0, list)
            .map((voter: { account: string; support: boolean }) => (
              <div className="flex justify-between" key={voter.account}>
                <div className="flex space-x-3 items-center">
                  <img
                    src={`https://avatars.z52da5wt.xyz/${voter.account}`}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm dark:text-white text-dark">
                    {`${voter?.account?.slice(0, 20)}...`}{' '}
                    {user.address === voter.account && (
                      <span className="text-primary text-sm">(You)</span>
                    )}
                  </p>
                </div>
                <p className="dark:text-white text-dark">
                  {voter.support ? 'Yes' : 'No'}
                </p>
              </div>
            ))}

          {voters.length > 12 && (
            <React.Fragment>
              {list !== voters.length && (
                <Button
                  className="w-full "
                  onClick={() => setList(voters.length)}
                >
                  Show more
                </Button>
              )}
            </React.Fragment>
          )}
        </div>
      ) : (
        <div className="w-full py-8">
          <Image
            src={EmptyDAO}
            alt="DAO empty"
            width={60}
            className="mx-auto"
          />
          <p className="text-center font-light">No votes currently</p>
        </div>
      )}
    </div>
  );
};

export default AllVoters;
