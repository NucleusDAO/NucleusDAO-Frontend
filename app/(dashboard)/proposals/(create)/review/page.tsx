'use client';
import { proposalSummary } from '@/config/dao-config';
import { cn } from '@/libs/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveUpRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PROPOSALS_URL } from '@/config/path';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/app-context';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '@/components/animation-options';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import Link from 'next/link';
import { toast } from 'sonner';

// daoContractAddress: string,
// proposalType: string,
// description: string,
// value: number,
// target: string

const ReviewProposal = () => {
  const { createProposal, newProposalInfo, getEachDAO } = useContext(AppContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { address } = user;
  const searchParams = useSearchParams();
  const daoID = searchParams.get('ct');
  const router = useRouter();

  console.log(newProposalInfo, '-> new proposal');

  const handleCreateProposal = async () => {
    setIsCreating(true);
    try {
      const dao = await getEachDAO(daoID);
      console.log(dao, '-> dao')
      if (dao) {
        await createProposal(
          dao.contractAddress,
          'transfe',
          'Annual Anniversay event fund',
          100,
          'ak_F7ZzN6kMcst2rFo7s3QEPjD5Frgy36NPeL32Wf9Cx4SnC8oPn'
        );
        setOpen(true);
      } else {
        toast.error('Contract address not found')
      }
      setIsCreating(false)
      // router.push(PROPOSALS_URL);
    } catch (error: any) {
      setIsCreating(false)
      toast.error(error.message)
      console.error({ error });
    }
  };

  const handleGoHome = () => {
    router.push(PROPOSALS_URL);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-dark dark:text-white text-xl">
          Review your Proposal
        </h1>
        <p className="text-[#888888] text-sm font-light">
          By carefully reviewing these points, you contribute to the quality and
          effectiveness of proposals within our DAO.
        </p>
      </div>

      <div className="dark:bg-[#1E1E1E] rounded-lg px-4 py-6 space-y-6 bg-light">
        <h1 className="font-medium text-dark dark:text-white text-xl">
          Proposal Information
        </h1>
        {proposalSummary({ ...newProposalInfo.value, address }).map(
          (summary, index) => (
            <>
              {(summary.desc) && (
                <div className="grid grid-cols-2 text-sm w-4/6" key={summary.title}>
                    <p className="dark:text-white text-dark">{summary.title}</p>
                    {summary.title === 'Logo' && (
                      <img
                      src={summary.desc}
                      alt="logo"
                      className="rounded-lg h-[50px] w-[50px] object-cover -mt-4"
                    />
                    )}
                    {summary.title === 'Published by' && (
                      <div className='flex space-x-2'>
                        <img
                          src={`https://avatars.z52da5wt.xyz/${address}`}
                          alt="logo"
                          width={20}
                        />
                        <p className="dark:text-white text-dark">{summary.desc}</p>
                      </div>
                    )}

                    {summary.title === 'Social Media' && (
                        summary.desc.map((social: { type: string; link: string; }) => (
                          <Link
                          href={social.link}
                          key={social.type}
                          target='_blank'
                        >
                          <div className='flex items-center space-x-2 text-primary'>
                            <p className=''>{social.type}</p>
                            <div className='border border-primary rounded-sm p-0.5'>
                              <MoveUpRight size={10} />
                            </div>
                          </div>
                        </Link>
                        ))
                      )}
                      {summary.title !== 'Social Media' && (
                        <p className="dark:text-white text-dark">{summary.desc}</p>
                      )}

                  </div>
              )}
            </>
            // <div className="grid grid-cols-2 text-sm w-4/6" key={summary.title}>
            //   <p className="dark:text-white text-dark">{summary.title}</p>
            //   {summary.title === 'Logo' && (
                // <img
                //   src={summary.desc}
                //   alt="logo"
                //   className="rounded-lg h-[50px] w-[50px] object-cover -mt-4"
                // />
            //   )}
            //   {(summary.title !== 'Logo' && summary.title !== 'Social Media') && (
            //     <>
            //       <div className="flex space-x-2 items-center">
            //         {summary.title === 'Published by' && (
            //           <img
            //             src={`https://avatars.z52da5wt.xyz/${address}`}
            //             alt="logo"
            //             width={20}
            //           />
            //         )}
            //         <p
            //           className={cn(
            //             'text-defaultText',
            //             index === proposalSummary.length - 1 &&
            //               'dark:text-white font-light text-dark'
            //           )}
            //         >
            //           {summary.title !== 'Logo' && summary.desc}
            //         </p>
            //       </div>
            //     </>
            //   )}
            //   {summary.title === 'Social Media' && (
            //     summary.desc.map((social: { type: string; link: string; }) => (
            //       <Link
            //       href={social.link}
            //       key={social.type}
            //       target='_blank'
            //     >
            //       <div className='flex items-center space-x-2 text-primary'>
            //         <p className=''>{social.type}</p>
            //         <div className='border border-primary rounded-sm p-0.5'>
            //           <MoveUpRight size={10} />
            //         </div>
            //       </div>
            //     </Link>
            //     ))
            //   )}
            // </div>
          )
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="dark:bg-[#1E1E1E] dark:hover:bg-[#262525] bg-light dark:text-defaultText text-dark"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
        <Button type="submit" className="px-12" onClick={handleCreateProposal} loading={isCreating} loadingText='Publishing...'>
              Publish Proposal
            </Button>
          <AlertDialogContent className="dark:bg-[#191919] bg-light">
            <AlertDialogHeader>
              <AlertDialogDescription className="text-center text-[#888888] text-sm font-light">
                <Lottie
                  options={defaultSuccessOption}
                  height={150}
                  width={150}
                />
                <p className="font-medium dark:text-white pb-2 -mt-2 text-xl text-dark">
                  Proposal Created
                </p>
                Congratulations! Your proposal has been successfully published
                on your DAO platform. It is now available for review,
                discussion, and voting by the DAO members.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full">
              <Button className="w-full" onClick={handleGoHome}>
                Back home
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ReviewProposal;
