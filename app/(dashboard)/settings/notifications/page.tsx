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
import { editNotifications } from '@/libs/validations/dao-schema';
import { Switch } from '@/components/ui/switch';

const Notifications = () => {
  const form = useForm<z.infer<typeof editNotifications>>({
    resolver: zodResolver(editNotifications),
    defaultValues: {
      email_new_dao: false,
      email_new_proposal: false,
      email_new_updates: false,
      push_new_dao: false,
      push_new_proposal: false,
      push_new_updates: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-white font-medium text-xl" role="heading">
        Notifications
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-white font-medium">Email</h3>
            <FormField
              control={form.control}
              name="email_new_dao"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">New DAO</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_new_proposal"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Proposal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_new_updates"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Updates
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium">Push</h3>
            <FormField
              control={form.control}
              name="push_new_dao"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">New DAO</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="push_new_proposal"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Proposal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="push_new_updates"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-defaultText">
                    New Updates
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Notifications;
