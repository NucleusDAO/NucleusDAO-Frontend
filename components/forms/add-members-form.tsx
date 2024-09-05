'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { defineMembershipSchema } from '@/libs/validations/dao-schema';
import { MoveLeft, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DAO_INFO_URL, GOVERNANCE_SETTINGS_URL } from '@/config/path';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/app-context';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { wait } from '@/libs/utils';

const AddMemberForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const { updateNewDaoInfo, newDaoInfo } = useContext(AppContext);
  const router = useRouter();
  const { address } = user;
  const defineSchema = defineMembershipSchema(address);

  // Infer the type after defining the schema
  type MembershipSchemaType = z.infer<typeof defineSchema>;

  const form = useForm<MembershipSchemaType>({
    resolver: zodResolver(defineMembershipSchema(address)),
    defaultValues: {
      members: newDaoInfo.members,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const handleBack = () => {
    setIsBack(true);
    wait().then(() => {
      router.push(DAO_INFO_URL);
      setIsBack(false);
    });
  };

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...newDaoInfo,
      members: data.members,
      memberComplete: true,
    };
    sessionStorage.setItem('new_dao', JSON.stringify(updatedData));
    updateNewDaoInfo(updatedData);
    setIsPending(true);
    wait().then(() => {
      router.push(GOVERNANCE_SETTINGS_URL);
      setIsPending(false);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormLabel>Add Members</FormLabel>
          {fields.map((member: any, index) => (
            <div className="flex items-center w-full space-x-4 justify-between" key={member.id}>
              <div className="w-[96%]">
                <FormField
                  control={form.control}
                  name={`members.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter wallet address" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.members?.[index]?.root?.message || ''}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 1 && (
                <div className="w-[3%]" role="button" onClick={() => remove(index)}>
                  <Trash2 color="#F998A9" size={20} />
                </div>
              )}
            </div>
          ))}
          <div
            className="flex space-x-2 bg-[#1E1E1E] border border-[#292929] text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs"
            role="button"
            onClick={() => append({ address: '' as any })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            className="dark:bg-[#1E1E1E] bg-light dark:hover:bg-[#262525] hover:bg-light text-[#444444] dark:text-defaultText"
            onClick={handleBack}
            loading={isBack}
          >
            <MoveLeft size={20} />
          </Button>
          <Button type="submit" className="px-12" loading={isPending} loadingText="Please wait...">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMemberForm;
