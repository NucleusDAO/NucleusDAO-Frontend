'use client';
import DaoConfigurationWrapper from '@/components/dao-configuraiton-wrapper';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editDaoInfoLinksSchema } from '@/libs/validations/dao-schema';
import { Plus, Trash2 } from 'lucide-react';

const Links = () => {
  const form = useForm<z.infer<typeof editDaoInfoLinksSchema>>({
    resolver: zodResolver(editDaoInfoLinksSchema),
    defaultValues: {
      socialMedia: [{ type: '', link: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMedia',
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <DaoConfigurationWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-medium text-white">Social Links</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="font-light text-white text-sm">Type</div>
              <div className="font-light text-white text-sm">Link</div>
            </div>
            {fields.map((social: any, index) => (
              <div
                className="flex items-center w-full space-x-4 justify-between"
                key={social.id}
              >
                <div className="grid grid-cols-2 gap-6 w-[95%]">
                  <FormField
                    control={form.control}
                    name={`socialMedia.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Website, Twitter, Instagram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialMedia.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="https://" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <div
                    className="w-[3%]"
                    role="button"
                    onClick={() => remove(index)}
                  >
                    <Trash2 color="#F998A9" size={20} />
                  </div>
                )}
              </div>
            ))}
            <div
              className="flex space-x-2 bg-[#1E1E1E] border border-[#292929] text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs"
              role="button"
              onClick={() => append({ type: '', link: '' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </div>
          </div>
        </form>
      </Form>
    </DaoConfigurationWrapper>
  );
};

export default Links;