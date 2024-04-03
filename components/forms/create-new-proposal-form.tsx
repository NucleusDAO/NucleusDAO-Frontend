'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import RoundedIcon from '@/assets/icons/roundedIcon.png';
import Image from 'next/image';

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
import {
  proposalInfoSchema,
} from '@/libs/validations/dao-schema';
import { Textarea } from '../ui/textarea';
import { Minus, Plus } from 'lucide-react';
import FormGroup from '../ui/form-group';
import { useRouter } from 'next/navigation';
import { REVIEW_PROPOSAL_URL } from '@/config/path';
import { proposalLists } from '@/config/dao-config';
import {
  cn,
  handleChangeFormNumberInput,
  handleMinus,
  handlePlus,
} from '@/libs/utils';
import { Checkbox } from '../ui/checkbox';
import { useEffect, useState } from 'react';

const CreateNewProposalForm = () => {
  const router = useRouter();
  const [showEl, setShowEl] = useState<boolean>(false);
  const form = useForm<z.infer<typeof proposalInfoSchema>>({
    resolver: zodResolver(proposalInfoSchema),
    defaultValues: {
      title: '',
      description: '',
      targetWallet: '',
      value: '0.000067 AE',
      duration: 0,
      quorum: 0,
    },
  });
  const selectedTitle = form.watch('title');
  useEffect(() => {
    setShowEl(!!selectedTitle); // Display the element if watchedInputValue is truthy
  }, [selectedTitle]);

  const onSubmit = async (data: any) => {
    console.log(data);
    router.push(REVIEW_PROPOSAL_URL);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Choose title"
                      className="dark:text-white placeholder:text-[#444444] text-dark"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {proposalLists.map((list) => (
                    <SelectItem value={list.title} key={list.title}>
                      {list.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Purpose of the proposal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(form.getValues('title') === 'Propose a transfer' && showEl) && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="targetWallet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Wallet</FormLabel>
                    <FormControl>
                      <Input placeholder="Wallet address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <FormGroup>
                        <Input placeholder="value" {...field} />
                        <p className="text-xs font-light text-[#888888] absolute right-4">
                          120 <span className="text-[10px]">USD</span>
                        </p>
                      </FormGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Duration</FormLabel>
                  <FormControl>
                  <FormGroup className="space-x-6">
                            <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                              <div
                                className={cn(
                                  'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2]'
                                )}
                                role="button"
                                onClick={() => handleMinus('duration', form)}
                              >
                                <Minus size={18} />
                              </div>
                              <Input
                                placeholder="value"
                                type="number"
                                className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                                {...field}
                                onChange={({ target }) =>
                                  handleChangeFormNumberInput(
                                    'duration',
                                    target.value,
                                    form
                                  )
                                }
                              />
                              <div
                                className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2]"
                                role="button"
                                onClick={() => handlePlus('duration', form)}
                              >
                                <Plus size={18} />
                              </div>
                            </div>
                            <p className="text-white font-light text-sm">Days</p>
                          </FormGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {(form.getValues('title') === 'Propose to add a new member to the group' || form.getValues('title') === 'Propose to remove member from the group' && showEl) && (
          <>
            <FormField
              control={form.control}
              name="targetWallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Wallet</FormLabel>
                  <FormControl>
                    <Input placeholder="Wallet address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Duration</FormLabel>
                  <FormControl>
                  <FormGroup className="space-x-6">
                            <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                              <div
                                className={cn(
                                  'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2]'
                                )}
                                role="button"
                                onClick={() => handleMinus('duration', form)}
                              >
                                <Minus size={18} />
                              </div>
                              <Input
                                placeholder="value"
                                type="number"
                                className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                                {...field}
                                onChange={({ target }) =>
                                  handleChangeFormNumberInput(
                                    'duration',
                                    target.value,
                                    form
                                  )
                                }
                              />
                              <div
                                className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2]"
                                role="button"
                                onClick={() => handlePlus('duration', form)}
                              >
                                <Plus size={18} />
                              </div>
                            </div>
                            <p className="text-white font-light text-sm">Days</p>
                          </FormGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {(form.getValues('title') === 'Propose to change voting time' && showEl) && (
            <>
                <div className="grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="minimum"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Minimum</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="From how many days"
                            type="number"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maximum"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Maximum</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="To how many days"
                            type="number"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposal Duration</FormLabel>
                      <FormControl>
                      <FormGroup className="space-x-6">
                            <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                              <div
                                className={cn(
                                  'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2]'
                                )}
                                role="button"
                                onClick={() => handleMinus('duration', form)}
                              >
                                <Minus size={18} />
                              </div>
                              <Input
                                placeholder="value"
                                type="number"
                                className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                                {...field}
                                onChange={({ target }) =>
                                  handleChangeFormNumberInput(
                                    'duration',
                                    target.value,
                                    form
                                  )
                                }
                              />
                              <div
                                className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2]"
                                role="button"
                                onClick={() => handlePlus('duration', form)}
                              >
                                <Plus size={18} />
                              </div>
                            </div>
                            <p className="text-white font-light text-sm">Days</p>
                          </FormGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
        )}

{(form.getValues('title') === 'Propose to change the quorum' && showEl) && (
    <>
        <FormField
          control={form.control}
          name="quorum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal Quorum</FormLabel>
              <FormControl>
                <FormGroup className="space-x-6">
                  <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                    <div
                      className={cn(
                        'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2]'
                      )}
                      role="button"
                      onClick={() => handleMinus('duration', form)}
                    >
                      <Minus size={18} />
                    </div>
                    <Input
                      placeholder="value"
                      type="number"
                      className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                      {...field}
                      onChange={({ target }) =>
                        handleChangeFormNumberInput(
                          'quorum',
                          target.value,
                          form
                        )
                      }
                    />
                    <div
                      className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2]"
                      role="button"
                      onClick={() => handlePlus('quorum', form)}
                    >
                      <Plus size={18} />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Checkbox
                      id="proposalCheck"
                      className="rounded-full border-[#5BE950] data-[state=checked]:bg-[#5BE950]"
                    />
                    <label
                      htmlFor="proposalCheck"
                      className="dark:text-[#FFF] text-sm text-dark"
                    >
                      Proposal will be approved by many
                    </label>
                  </div>
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposal Duration</FormLabel>
                      <FormControl>
                      <FormGroup className="space-x-6">
                            <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                              <div
                                className={cn(
                                  'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2]'
                                )}
                                role="button"
                                onClick={() => handleMinus('duration', form)}
                              >
                                <Minus size={18} />
                              </div>
                              <Input
                                placeholder="value"
                                type="number"
                                className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                                {...field}
                                onChange={({ target }) =>
                                  handleChangeFormNumberInput(
                                    'duration',
                                    target.value,
                                    form
                                  )
                                }
                              />
                              <div
                                className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2]"
                                role="button"
                                onClick={() => handlePlus('duration', form)}
                              >
                                <Plus size={18} />
                              </div>
                            </div>
                            <p className="text-white font-light text-sm">Days</p>
                          </FormGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    </>
)}

{(form.getValues('title') === 'Other' && showEl) && (
                    <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposal Duration</FormLabel>
                        <FormControl>
                        <FormGroup className="space-x-6">
                            <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                              <div
                                className={cn(
                                  'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2]'
                                )}
                                role="button"
                                onClick={() => handleMinus('duration', form)}
                              >
                                <Minus size={18} />
                              </div>
                              <Input
                                placeholder="value"
                                type="number"
                                className="border-none dark:bg-[#191919] w-fit text-center bg-white"
                                {...field}
                                onChange={({ target }) =>
                                  handleChangeFormNumberInput(
                                    'duration',
                                    target.value,
                                    form
                                  )
                                }
                              />
                              <div
                                className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2]"
                                role="button"
                                onClick={() => handlePlus('duration', form)}
                              >
                                <Plus size={18} />
                              </div>
                            </div>
                            <p className="text-white font-light text-sm">Days</p>
                          </FormGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
)}

        <div className="flex justify-between">
          <div className="flex space-x-3 items-center">
            <p className="font-light text-sm text-[#888888]">Published by</p>
            <Image src={RoundedIcon} alt="logo" width={20} height={20} />
            <p className="text-sm dark:text-white text-dark">9xfDAO...ntY897</p>
          </div>
          <Button type="submit" className="px-12">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewProposalForm;
