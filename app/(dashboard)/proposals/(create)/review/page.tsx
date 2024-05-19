'use client';
import { proposalLists, rate } from '@/config/dao-config';
import { defaultProposal } from '@/libs/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveUpRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CREATE_PROPOSAL_URL, PROPOSALS_URL } from '@/config/path';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/app-context';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from '@/components/animation-options';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { toast } from 'sonner';
import { uploadFile } from '@/config/apis';
import { ApiContext } from '@/context/api-context';
import Link from 'next/link';
import { EachDaoContext } from '@/context/each-dao-context';

const ReviewProposal = () => {
  const {
    createProposal,
    fetchAllProposals,
    newProposalInfo,
    getEachDAO,
    getActivities,
    setNewProposalInfo,
    fetchDAOs,
    setUpdate,
  } = useContext(AppContext);
  const { getAEPrice } = useContext(ApiContext);
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { address } = user;
  const searchParams = useSearchParams();
  const daoID = searchParams.get('ct');
  const proposalType = searchParams.get('type') || '';
  const enums = searchParams.get('enums') || '';
  const router = useRouter();
  const { value } = newProposalInfo;

  const handleCreateProposal = async () => {
    setIsCreating(true);
    let logoURL;
    let updatedSocials;
    try {
      if (value.logo) {
        let formData = new FormData();
        formData.append('file', value.logo);
        formData.append('upload_preset', 'bqr7mcvh');
        const fileUpload = await uploadFile(formData);
        logoURL = fileUpload.data.url;
      }
      if (value.socialMedia[0].type && value.socialMedia[0].link) {
        updatedSocials = value.socialMedia.map(
          (social: { type: string; link: string }) => {
            return { name: social.type, url: social.link };
          }
        );
      }
      const dao = await getEachDAO(daoID);
      if (dao) {
        await createProposal(
          dao.contractAddress,
          proposalLists[Number(value.type)].type,
          value.description,
          Number(value.value) || Number(value.maximum) || value.quorum || 0,
          value.targetWallet || address,
          {
            name: value?.newName || '',
            socials: updatedSocials
              ? [...(dao.Socials || []), ...updatedSocials]
              : dao.socials,
            image: logoURL || '',
          }
        );
        setOpen(true);
        setIsCreating(false);
        setUpdate(true);
      } else {
        toast.error('Contract address not found');
      }
    } catch (error: any) {
      setIsCreating(false);
      toast.error(error.message);
      console.error({ error });
    }
  };

  const handleGoHome = async () => {
    // setOpen(false);
    setIsRouting(true);
    try {
      await getActivities(address);
      router.push(PROPOSALS_URL);
      localStorage.removeItem('new_proposal');
      setNewProposalInfo(defaultProposal);
      setIsRouting(false);
    } catch (error: any) {
      setIsRouting(false);
      toast.error(error.message);
    } finally {
      setIsRouting(false);
    }
  };

  if (!daoID || !proposalType) {
    router.back();
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
        <div className="grid grid-cols-12 text-sm">
          <p className="dark:text-white text-dark col-span-4">Title</p>
          <p className="dark:text-[#888888] text-dark col-span-8">
            {proposalLists[Number(value.type)].title}
          </p>
        </div>
        {value.description && (
          <div className="grid grid-cols-12 text-sm">
            <p className="dark:text-white col-span-4 text-dark">Description</p>
            <p className="dark:text-[#888888] col-span-8 text-dark">
              {value.description}
            </p>
          </div>
        )}
        {value.newName && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">New Name</p>
            <p className="dark:text-[#888888] text-dark">{value.newName}</p>
          </div>
        )}
        {!!value.quorum && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">New Quorum</p>
            <p className="dark:text-[#888888] text-dark">{value.quorum}%</p>
          </div>
        )}
        {value.targetWallet && (
          <div className="grid grid-cols-12 text-sm">
            <p className="dark:text-white col-span-4 text-dark">
              Target Wallet
            </p>
            <p className="overflow-hidden col-span-8 dark:text-[#888888] text-dark">
              <span className="whitespace-pre-wrap break-all">
                {value.targetWallet}
              </span>
            </p>
          </div>
        )}
        {value.duration && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">Duration</p>
            <p className="dark:text-[#888888] text-dark">{`${value.duration} day(s)`}</p>
          </div>
        )}
        {value.maximum && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">New Duration</p>
            <p className="dark:text-[#888888] text-dark">{`${value.maximum} day(s)`}</p>
          </div>
        )}
        {value.value && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">Value</p>
            <p className="dark:text-[#888888] text-dark">{`${
              value.value
            } AE ~ ${
              Number(value.value || 0) * (getAEPrice?.price || rate)
            }USD`}</p>
          </div>
        )}
        {value.socialMedia[0].type && (
          <div className="grid grid-cols-2 text-xs md:text-sm md:w-4/6">
            <p className="dark:text-white text-dark">Links</p>
            {!value.socialMedia[0].type && 'None'}
            {value.socialMedia[0].type && (
              <div className="flex space-x-4">
                {value.socialMedia.map(
                  (socialMedia: { link: string; type: string }) => (
                    <Link
                      href={socialMedia.link}
                      key={socialMedia.type}
                      target="_blank"
                    >
                      <div className="flex items-center space-x-2 text-primary text-sm">
                        <p className="">{socialMedia.type}</p>
                        <div className="border border-primary rounded-sm p-0.5">
                          <MoveUpRight size={10} />
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        )}
        {value.logo && (
          <div className="grid grid-cols-2 text-sm w-4/6">
            <p className="dark:text-white text-dark">Logo</p>
            <img
              src={value.logo}
              alt="logo"
              className="rounded-lg h-[50px] w-[50px] object-cover -mt-4"
            />
          </div>
        )}
        <div className="grid grid-cols-2 text-sm w-4/6">
          <p className="dark:text-white text-dark">Publish by</p>
          <div className="flex space-x-2">
            <img
              src={`https://avatars.z52da5wt.xyz/${address}`}
              alt="logo"
              width={20}
            />
            <p className="dark:text-[#888888] text-dark">{`${address.slice(
              0,
              15
            )}...`}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          className="dark:bg-[#1E1E1E] dark:hover:bg-[#262525] bg-light dark:text-defaultText text-dark"
          onClick={() =>
            router.push(
              `${CREATE_PROPOSAL_URL}?ct=${daoID}&enums=${proposalType}`
            )
          }
        >
          <MoveLeft size={20} />
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <Button
            type="submit"
            className="px-12"
            onClick={handleCreateProposal}
            loading={isCreating}
            loadingText="Publishing..."
          >
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
              <Button
                className="w-full"
                onClick={handleGoHome}
                loading={isRouting}
                loadingText="Please wait ..."
              >
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
