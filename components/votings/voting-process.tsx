'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const VotingProcess = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
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
          <Dialog onOpenChange={setShowModal} open={showModal}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={!selectedOption}>
                Vote
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#191919]">
              <DialogHeader>
                <DialogTitle className="text-white font-medium py-1 text-center">
                Vote Casted
                </DialogTitle>
                <DialogDescription className="font-light py-2 text-center">
                You have casted your vote. The result will be shown if the proposal reaches its quorum
                </DialogDescription>
              </DialogHeader>
              <Button className="w-full" onClick={() => setShowModal(false)}>Done</Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default VotingProcess;
