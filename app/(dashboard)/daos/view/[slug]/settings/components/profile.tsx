'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editDaoInfoSchema } from '@/libs/validations/dao-schema';
import FormGroup from '@/components/ui/form-group';
import Logo from '@/assets/logos/legacy.png';
import Image from 'next/image';
import { EditIcon } from '@/assets/svgs';
import DaoConfigurationWrapper from '@/components/dao-configuraiton-wrapper';

const Profile = () => {
  const form = useForm<z.infer<typeof editDaoInfoSchema>>({
    resolver: zodResolver(editDaoInfoSchema),
    defaultValues: {
      daoName: '',
      logo: '',
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <DaoConfigurationWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="daoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dao name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter DAO name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <FormGroup>
                      <Image
                        src={Logo}
                        alt="logo"
                        width={60}
                        height={64}
                        className="object-cover"
                      />
                      <EditIcon className="mt-8 -ml-4" />
                      <Input
                        type="file"
                        className="absolute h-full border-b border-0 rounded-none inset-0 cursor-pointer opacity-0"
                        accept=".jpg, .jpeg, .png"
                        {...field}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
    </DaoConfigurationWrapper>
  );
};

export default Profile;
