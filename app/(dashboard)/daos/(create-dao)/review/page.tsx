'use client';

import { Button } from '@/components/ui/button';
import { MoveLeft, MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DAO_URL } from '@/config/path';

const ReviewDao = () => {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-xl">Review your DAO</h1>
        <p className="text-[#888888] text-sm font-light">
          By thoroughly reviewing these aspects, you contribute to the
          robustness and transparency of our DAO. Your attention to detail
          ensures a secure and effective decentralized decision-making process.
        </p>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 space-y-6">
        <h1 className="font-medium text-white text-xl">DAO Style</h1>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">Type</p>
          <p className="text-defaultText">Basic DAO</p>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 space-y-6">
        <h1 className="font-medium text-white text-xl">DAO Information</h1>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">DAO name</p>
          <p className="text-defaultText">Legacy</p>
        </div>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">DAO address</p>
          <p className="text-defaultText">Https://www.Legacy.com</p>
        </div>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">About</p>
          <p className="text-defaultText">
            Legacy is a Decentralized Autonomous organization that aims to
            empower people and make the world a better place. Join us on our
            journey to a more decentralized future. Vote to contribute and
            revolutionize Assets.
          </p>
        </div>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">Links</p>
          <Link href="#">
            <div className="flex items-center space-x-2 text-primary">
              <p className="">Twitter</p>
              <div className="border border-primary rounded-sm p-0.5">
                <MoveUpRight size={10} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 space-y-6">
        <h1 className="font-medium text-white text-xl">Define Membership</h1>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">Members</p>
          <p className="text-defaultText">1 wallet address (es)</p>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 space-y-6">
        <h1 className="font-medium text-white text-xl">Governance Settings</h1>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">Duration</p>
          <p className="text-defaultText">5 days</p>
        </div>
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="text-white">Voting threshold</p>
          <p className="text-defaultText">50% quorum</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="bg-[#1E1E1E] hover:bg-[#262525]"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" className="px-12">
              Create DAO
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-[#191919]'>
            <AlertDialogHeader>
              <AlertDialogDescription className='text-center text-[#888888] text-sm font-light'>
                <p className='font-medium text-white py-2 text-xl'>Dao Created</p>
              Congratulations! You have successfully created your DAO (Decentralized Autonomous Organization). Your DAO is now ready to embark on its mission, engage community members, and foster decentralized decision-making.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='w-full'>
              <Button className='w-full' onClick={() => router.push(DAO_URL)}>Back home</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ReviewDao;
