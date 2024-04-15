'use client';
import { CopyIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editProfile } from '@/libs/validations/dao-schema';
import { Textarea } from '@/components/ui/textarea';
import { useContext } from 'react';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { toast } from 'sonner';

const Profile = () => {
  const {
    user: { address, isConnected },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);

  const form = useForm<z.infer<typeof editProfile>>({
    resolver: zodResolver(editProfile),
    defaultValues: {
      name: '',
      email: '',
      about: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <h2
        className="text-dark dark:text-white font-medium text-xl"
        role="heading"
      >
        My Profile
      </h2>
      <div className="flex space-x-2 items-center">
        <img
          src={`https://avatars.z52da5wt.xyz/${address}`}
          alt="logo"
          width={60}
          className='rounded-full'
        />
        <div className="space-y-2">
          <p className="text-sm text-dark dark:text-white font-medium">
            9xfDAO...ntY897
          </p>
          <CopyToClipboard text={address} onCopy={() => toast.info('Address copied to clipboard!')}>
            <div className="border border-[#444444] text-[#888888] p-2 rounded-lg flex space-x-2 text-sm">
              <p>{address.slice(0, 12)}...</p> <CopyIcon className='cursor-pointer' />
            </div>
          </CopyToClipboard>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell your story" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="px-12">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
