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
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PROPOSALS_URL } from '@/config/path';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '@/components/animation-options';

const ReviewProposal = () => {
  const { createProposal } = useContext(AppContext);

  const handleCreateProposal = async () => {
    try {
      await createProposal(
        'ct_2mrDW4h47GYRy7gUns9SGeVRRF6q6MYePga7pvUW4Hsfn7V1XB',
        'transfe',
        'Annual Anniversay event fund',
        100,
        'ak_F7ZzN6kMcst2rFo7s3QEPjD5Frgy36NPeL32Wf9Cx4SnC8oPn'
      );
      router.push(PROPOSALS_URL);
    } catch (error) {
      console.error({ error });
    }
  };
  const router = useRouter();
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
        {proposalSummary.map((summary, index) => (
          <div className="grid grid-cols-2 text-sm w-4/6" key={summary.title}>
            <p className="dark:text-white text-dark">{summary.title}</p>
            <div className="flex space-x-2 items-center">
              {index === proposalSummary.length - 1 && (
                <Image src={RoundedIcon} alt="logo" width={20} height={20} />
              )}
              <p
                className={cn(
                  'text-defaultText',
                  index === proposalSummary.length - 1 &&
                    'dark:text-white font-light text-dark'
                )}
              >
                {summary.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="dark:bg-[#1E1E1E] dark:hover:bg-[#262525] bg-light dark:text-defaultText text-dark"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" className="px-12">
              Publish Proposal
            </Button>
          </AlertDialogTrigger>
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
              <Button className="w-full" onClick={handleCreateProposal}>
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
