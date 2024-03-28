'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { REVIEW_DAO_URL } from '@/config/path';
import { cn, handleChangeNumberInput } from '@/libs/utils';
import { Minus, MoveLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GovernanceSettings = () => {
    const [days, setDays] = useState<number|string>();
    const [quorum, setQuorum] = useState<number|string>();

    const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-xl">Governance Settings</h1>
        <p className="text-[#888888] text-sm font-light">
          Only authorized individuals are permitted to create proposals. Choose
          what creation rights you give DAO groups. This can be changed in
          settings later.
        </p>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-white font-medium">Any Wallet</h3>
          <p className="text-defaultText font-light text-sm">
            Any wallet can create proposals
          </p>
        </div>
        <Checkbox className="rounded-full" />
      </div>

      <div>
        <h3 className="text-white font-medium">Any Wallet</h3>
        <p className="text-defaultText font-light text-sm">
          Any wallet can create proposals
        </p>
      </div>

      <div className='space-y-3'>
        <label className='text-white font-light text-sm'>Days</label>
        <div className='border border-[#292929] flex items-center justify-between rounded-lg py-1 px-5'>
            <div className={cn('bg-[#1E1E1E] rounded-lg py-2 px-2 hover:bg-[#2a2a2a] trans', days === 0 && 'cursor-default')} role='button' onClick={() => { days === 0 ? null : setDays((prev) => Number(prev) - 1) }}><Minus size={18} /></div>
            <Input value={days} type='number' className='border-none bg-[#191919] w-fit text-center' placeholder='0' pattern="[1-9][0-9]*" onChange={({ target }) => handleChangeNumberInput(target.value, setDays)} />
            <div className='bg-[#1E1E1E] rounded-lg py-2 px-2 hover:bg-[#2a2a2a] trans' role='button' onClick={() => setDays((prev) => Number(prev || 0) + 1)}><Plus size={18} /></div>
        </div>
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
            <h3 className="text-white font-medium">Voting threshold</h3>
            <p className='text-defaultText font-light text-sm'>Proposal approval requires a majority ‘Yes’ votes from participating wallets, surpassing a predefined threshold.</p>
        </div>
      <div className='space-y-3'>
                <label className='text-white font-light text-sm mt-4'>Quorum</label>
        <div className='grid grid-cols-2 gap-12 items-center'>
            <div>
                <div className='border border-[#292929] flex items-center justify-between rounded-lg py-1 px-5'>
                    <div className={cn('bg-[#1E1E1E] rounded-lg py-2 px-2 hover:bg-[#2a2a2a] trans', quorum === 0 && 'cursor-default')} role='button' onClick={() => { quorum === 0 ? null : setQuorum((prev) => Number(prev) - 1) }}><Minus size={18} /></div>
                    <Input value={quorum} type='number' className='border-none bg-[#191919] w-fit text-center' placeholder='0' pattern="[1-9][0-9]*" onChange={({ target }) => handleChangeNumberInput(target.value, setQuorum)} />
                    <div className='bg-[#1E1E1E] rounded-lg py-2 px-2 hover:bg-[#2a2a2a] trans' role='button' onClick={() => setQuorum((prev) => Number(prev || 0) + 1)}><Plus size={18} /></div>
                </div>
            </div>
            <div className='flex space-x-3'>
                <Checkbox id="proposalCheck" className='rounded-full border-[#5BE950] data-[state=checked]:bg-[#5BE950]' /> 
                <label htmlFor='proposalCheck' className='text-[#FFF] text-sm font-light'>Proposal will be approved by many</label>
            </div>
        </div>
      </div>
      </div>

      <div className='flex justify-between'>
          <Button type="button" className='bg-[#1E1E1E] hover:bg-[#262525]' onClick={() => router.back()}><MoveLeft size={20} /></Button>
          <Button type="submit" className='px-12' onClick={() => router.push(REVIEW_DAO_URL)}>Next</Button>
        </div>
    </div>
  );
};

export default GovernanceSettings;
