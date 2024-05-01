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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { joinCommunitySchema } from '@/libs/validations/dao-schema';

const JoinCommunityForm = () => {

  const form = useForm<z.infer<typeof joinCommunitySchema>>({
    resolver: zodResolver(joinCommunitySchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='bg-[#1E1E1E66] h-[56px] pl-4 text-[#888888] dark:text-[#888888] pr-28 placeholder:text-[#292929] border-[#65656580]' placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage className='text-left' />
            </FormItem>
          )}
        />
<Button className='absolute -top-6 right-2 px-6' style={{ height: '41px' }}>Susbcribe</Button>
      </form>
    </Form>
  );
};

export default JoinCommunityForm;
