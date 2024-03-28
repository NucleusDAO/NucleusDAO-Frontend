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
import { defineMembershipSchema } from '@/libs/validations/dao-schema';
import { MoveLeft, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GOVERNANCE_SETTINGS_URL } from '@/config/path';

const AddMemberForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof defineMembershipSchema>>({
    resolver: zodResolver(defineMembershipSchema),
    defaultValues: {
      members: [{ address: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    router.push(GOVERNANCE_SETTINGS_URL);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormLabel>Add Members</FormLabel>
          {fields.map((member: any, index) => (
            <div
              className="flex items-center w-full space-x-4 justify-between"
              key={member.id}
            >
              <div className='w-[96%]'>
                <FormField
                  control={form.control}
                  name={`members.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter wallet address"
                          {...field}
                        />
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
            onClick={() => append({ address: '' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </div>
        </div>
        
        <div className='flex justify-between'>
          <Button type="button" className='bg-[#1E1E1E] hover:bg-[#262525]' onClick={() => router.back()}><MoveLeft size={20} /></Button>
          <Button type="submit" className='px-12'>Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMemberForm;
