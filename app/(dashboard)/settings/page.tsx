'use client'
import Image from 'next/image';
import WalletIcon from '@/assets/icons/roundedIcon.png';
import { CopyIcon } from '@/assets/svgs';
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
import { Input } from '@/components/ui/input';
import { editProfile } from '@/libs/validations/dao-schema';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
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
      <h2 className="text-white font-medium text-xl" role="heading">
        My Profile
      </h2>
      <div className="flex space-x-2 items-center">
        <Image src={WalletIcon} alt="wallet" width={60} />
        <div className="space-y-2">
          <p className="text-sm text-white font-medium">9xfDAO...ntY897</p>
          <div className="border border-[#444444] text-[#888888] p-2 rounded-lg flex space-x-2 text-sm">
            <p>9xfDAO...ntY897</p> <CopyIcon />
          </div>
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
