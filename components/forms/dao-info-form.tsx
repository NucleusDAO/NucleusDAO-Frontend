'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { daoInfoSchema } from '@/libs/validations/dao-schema';
import { Textarea } from '../ui/textarea';
import { MoveLeft, Plus, Trash2 } from 'lucide-react';
import FormGroup from '../ui/form-group';
import { useRouter } from 'next/navigation';
import { DEFINE_MEMBERSHIP_URL } from '@/config/path';

const DaoInfoForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof daoInfoSchema>>({
    resolver: zodResolver(daoInfoSchema),
    defaultValues: {
      daoName: '',
      daoAddress: '0x9b16d8285b2ca2b8341a728a874bdeedc9383e92ecd91011964a4a40dea58099',
      logo: '',
      about: '',
      socialMedia: [{ type: '', link: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMedia',
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    router.push(DEFINE_MEMBERSHIP_URL);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="daoName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dao name <span className='text-[#DD3857]'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter DAO name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="daoAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dao address (auto filled)</FormLabel>
              <FormControl>
                <Input placeholder="dao.ae" {...field} readOnly />
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
              <FormLabel>
                Logo{' '}
                <span className='text-[#DD3857]'>*</span>
                <span className="text-[#888888] text-sm">{' '}
                  JPG, PNG, or SVG of not more than 3MB.
                </span>
              </FormLabel>
              <FormControl>
                <FormGroup>
                  <div
                    className="dark:bg-[#1E1E1E] bg-light text-dark dark:text-defaultText h-[50px] w-[50px] rounded-lg flex items-center justify-center"
                    role="button"
                  >
                    <Plus />
                  </div>
                  <Input
                    type="file"
                    className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                    accept=".jpg, .jpeg, .png"
                    {...field}
                  />
                </FormGroup>
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
              <FormLabel>About <span className='text-[#DD3857]'>*</span></FormLabel>
              <FormControl>
                <Textarea placeholder="Purpose of the DAO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h2 className="font-medium text-dark dark:text-white">Social Links <span className='text-[#888888] font-light'>(Optional)</span></h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="font text-dark dark:text-white text-sm">Type</div>
            <div className="font text-dark dark:text-white text-sm">Link</div>
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
            className="flex space-x-2 bg-[#1E1E1E] border border-dark text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs"
            role="button"
            onClick={() => append({ type: '', link: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Link
          </div>
        </div>
        <div className='flex justify-between'>
          <Button type="button" className='dark:bg-[#1E1E1E] bg-light dark:hover:bg-[#262525] hover:bg-light text-[#444444] dark:text-defaultText' onClick={() => router.back()}><MoveLeft size={20} /></Button>
          <Button type="submit" className='px-12'>Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default DaoInfoForm;
