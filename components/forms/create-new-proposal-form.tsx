'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';

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
import { useEffect, useState } from 'react';
import {
  SelectFormField,
} from '@/components/proposals/proposal-form-element';
import ElementBlock from '../proposals/element-block';
import { EachProposalType } from '@/config/proposal-config';

const CreateNewProposalForm = () => {
  const searchParams = useSearchParams();
  const enums: string = searchParams.get('enums') || '0'
  const router = useRouter();
  const [showEl, setShowEl] = useState<boolean>(false);
  const form = useForm<z.infer<typeof proposalInfoSchema>>({
    resolver: zodResolver(proposalInfoSchema),
    defaultValues: {
      // title: '',
      type: enums,
      description: '',
      targetWallet: '',
      value: '0.000067 AE',
      duration: 0,
      quorum: 0,
      socialMedia: [{ type: '', link: '' }],
    },
  });

  const selectedTitle = form.watch('type');

  useEffect(() => {
    setShowEl(!!selectedTitle); // Display the element if watchedInputValue is truthy
  }, [selectedTitle]);

  const onSubmit = async (data: any) => {
    console.log(data);
    router.push(REVIEW_PROPOSAL_URL);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SelectFormField form={form} filterData={proposalLists} />

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
            <Image src={RoundedIcon} alt="logo" width={20} height={20} />
            <p className="text-sm dark:text-white text-dark">9xfDAO...ntY897</p>
          </div>
          <Button type="submit" className="px-12 w-full md:w-fit">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewProposalForm;
