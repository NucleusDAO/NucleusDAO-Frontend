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
import { editDisplay } from '@/libs/validations/dao-schema';
import { Switch } from '@/components/ui/switch';

const Display = () => {
  const form = useForm<z.infer<typeof editDisplay>>({
    resolver: zodResolver(editDisplay),
    defaultValues: {
      light_mode: false,
      dark_mode: false,
      device_settings: true,
    },
  });

  const handleOnCheck = (value: boolean, type: any) => {
    form.setValue('light_mode', type === 'light_mode' ? value : false);
    form.setValue('dark_mode', type === 'dark_mode' ? value : false);
    form.setValue(
      'device_settings',
      type === 'device_settings' ? value : false
    );
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="space-y-6">
      <h2 className="dark:text-white font-medium text-xl text-dark" role="heading">
        Display
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="light_mode"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">Light mode</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) =>
                      handleOnCheck(value, 'light_mode')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dark_mode"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">Dark mode</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) =>
                      handleOnCheck(value, 'dark_mode')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="device_settings"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="dark:text-white text-dark">
                  Use device settings
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) =>
                      handleOnCheck(value, 'device_settings')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Display;
