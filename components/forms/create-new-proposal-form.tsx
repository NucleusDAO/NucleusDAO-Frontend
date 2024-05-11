'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { proposalInfoSchema } from '@/libs/validations/dao-schema';
import { Textarea } from '../ui/textarea';
import { useRouter, useSearchParams } from 'next/navigation';
import { REVIEW_PROPOSAL_URL } from '@/config/path';
import { proposalLists } from '@/config/dao-config';
import { useContext, useEffect } from 'react';
import { SelectFormField } from '@/components/proposals/proposal-form-element';
import ElementBlock from '../proposals/element-block';
import { EachProposalType } from '@/config/proposal-config';
import { AppContext } from '@/context/app-context';
import { IConnectWalletContext } from '@/libs/types';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { getDaysFromMilliseconds, millisecondsToDays } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';

const CreateNewProposalForm = () => {
  const { setNewProposalInfo, newProposalInfo, getEachDAO } =
    useContext(AppContext);
  const { currentDAO } = useContext(EachDaoContext);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { address } = user;
  const searchParams = useSearchParams();
  const type: string = searchParams.get('enums') || newProposalInfo.value.type;
  const memberType = searchParams.get('type') || '';
  const daoID = searchParams.get('ct');
  const router = useRouter();
  const form = useForm<z.infer<typeof proposalInfoSchema>>({
    resolver: zodResolver(proposalInfoSchema),
    defaultValues: {
      ...newProposalInfo.value,
      duration: getDaysFromMilliseconds(newProposalInfo.value.duration),
      type,
    },
  });

  useEffect(() => {
    const getDuration = async () => {
      const dao = await getEachDAO(daoID);
      console.log(dao.votingTime, '-> dao.votingTime');
      const duration = millisecondsToDays(Number(dao.votingTime));
      form.setValue('duration', duration);
    };
    getDuration();
  }, []);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const updatedData = { ...newProposalInfo, value };
      localStorage.setItem('new_proposal', JSON.stringify(updatedData));
      setNewProposalInfo(updatedData);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: any) => {
    // router.push(`${REVIEW_PROPOSAL_URL}?ct=${daoID}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SelectFormField
          form={form}
          filterData={
            memberType ? [proposalLists[Number(type)]] : proposalLists
          }
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Purpose of the proposal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ElementBlock
          element={EachProposalType[form.getValues('type')]}
          form={form}
        />

        <div className="md:flex space-y-3 md:space-y-0 justify-between">
          <div className="flex space-x-3 items-center">
            <p className="font-light text-sm text-[#888888]">Published by</p>
            <img
              src={`https://avatars.z52da5wt.xyz/${address}`}
              alt="logo"
              width={20}
            />
            <p className="text-sm dark:text-white text-dark">
              {address.slice(0, 15)}...
            </p>
          </div>
          <Button
            type="submit"
            className="px-12 w-full md:w-fit"
            onClick={() => router.push(`${REVIEW_PROPOSAL_URL}?ct=${daoID}`)}
          >
            Review
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewProposalForm;
