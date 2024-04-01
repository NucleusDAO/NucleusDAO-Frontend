'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const VotingProcess = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const hasVoted: boolean = false;

  const votingOptions = ['yes', 'no'];

  return (
    <div>
      {hasVoted && (
        <p className="text-white">
          You have casted your vote. The result will be shown if the proposal
          reach its quorum
        </p>
      )}
      {!hasVoted && (
        <div className="space-y-5">
          {votingOptions.map((option) => (
            <RadioGroup
              defaultValue={selectedOption}
              value={selectedOption}
              key={option}
              onValueChange={setSelectedOption}
              role="button"
            >
              <div
                className="border border-[#292929] p-4 rounded-lg items-center flex justify-between"
                onClick={() => setSelectedOption(option)}
              >
                <Label
                  htmlFor={option}
                  id={option}
                  className="capitalize text-white font-medium"
                >
                  {option}
                </Label>
                <RadioGroupItem
                  className="rounded-full"
                  id={option}
                  value={option}
                />
              </div>
            </RadioGroup>
          ))}
          <Button className="w-full" disabled={!selectedOption}>Vote</Button>
        </div>
      )}
    </div>
  );
};

export default VotingProcess;
