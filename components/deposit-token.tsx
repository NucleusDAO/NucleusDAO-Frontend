import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useContext, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/libs/utils';
import { ApiContext } from '@/context/api-context';
import { rate } from '@/config/dao-config';
import { AppContext } from '@/context/app-context';
import { toast } from 'sonner';
import { EachDaoContext } from '@/context/each-dao-context';
import Lottie from 'react-lottie';
import { defaultSuccessOption } from './animation-options';
import { formatAmount, AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

const DepositToken = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [aeValue, setAeValue] = useState<number | string>(0);
  const [usdValue, setUsdValue] = useState<number | string>(0);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [isDeposited, setIsDeposited] = useState<boolean>(true);
  const { getAEPrice } = useContext(ApiContext);
  const { deposit } = useContext(AppContext);
  const { currentDAO } = useContext(EachDaoContext);

  const isError = Number.isNaN(usdValue) || Number.isNaN(aeValue);

  const handleDeposit = async () => {
    setIsDepositing(true);
    setIsDeposited(false);
    try {
      const amount = formatAmount(aeValue, {
        denomination: AE_AMOUNT_FORMATS.AE,
      });
      const res = await deposit(currentDAO.contractAddress, amount);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDepositing(false);
      setIsDeposited(true);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild onClick={() => setIsDeposited(false)}>
        <Button>Deposit Token</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-[#292929] dark:text-white font-medium py-2">
            Deposit Funds
          </DialogTitle>
          <DialogDescription className="font-light space-y-3">
            {isDeposited && (
              <div className="text-center">
                <Lottie
                  options={defaultSuccessOption}
                  height={150}
                  width={150}
                />
                <p className="font-medium dark:text-white pb-2 -mt-2 text-xl text-dark">
                  Fund Deposit Success
                </p>
                <p>
                  Congratulations! You have successfully deposited a sum of{' '}
                  {aeValue} AE to {currentDAO.name}
                </p>
                <Button
                  className="px-16 mt-4"
                  onClick={() => {
                    setAeValue(0);
                    setUsdValue(0);
                    setOpen(false);
                    setIsDeposited(false);
                  }}
                >
                  Complete
                </Button>
              </div>
            )}
            {!isDeposited && (
              <React.Fragment>
                <p>Kindly input the amount below.</p>
                <div className="space-y-4">
                  <p className="text-white">Token</p>
                  <div
                    className={cn(
                      'border border-[#292929] rounded-lg p-2 flex justify-between trans',
                      isError && 'border-destructive'
                    )}
                  >
                    <div className="relative w-[40%]">
                      <Input
                        placeholder="0.00"
                        className="pr-10"
                        defaultValue={parseFloat(aeValue.toString()).toFixed(2)}
                        value={parseFloat(aeValue.toString()).toFixed(2)}
                        onChange={({ target }) => {
                          setAeValue(target.value);
                          setUsdValue(
                            Number(target.value) * (getAEPrice?.price || rate)
                          );
                        }}
                      />
                      <p className="dark:text-white right-4 text-dark absolute top-[27%] font-medium">
                        AE
                      </p>
                    </div>
                    <div className="relative w-[40%]">
                      <Input
                        placeholder="0.00"
                        className=""
                        defaultValue={parseFloat(usdValue.toString()).toFixed(
                          2
                        )}
                        value={parseFloat(usdValue.toString()).toFixed(2)}
                        onChange={({ target }) => {
                          setAeValue(
                            Number(target.value) / (getAEPrice?.price || rate)
                          );
                          setUsdValue(target.value);
                        }}
                      />
                      <p className="dark:text-white right-4 text-dark absolute top-[27%] font-medium">
                        USD
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-3">
                    <Checkbox
                      id="terms"
                      checked={termsChecked}
                      onCheckedChange={(value: boolean) =>
                        setTermsChecked(value)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      By clicking, I agree to sign the{' '}
                      <span className="text-primary underline underline-offset-2">
                        superhero contract
                      </span>{' '}
                      to send funds.
                    </label>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!termsChecked || Number(aeValue) <= 0 || isError}
                    onClick={handleDeposit}
                    loading={isDepositing}
                    loadingText="Depositing..."
                  >{`Deposit ${Number(aeValue).toFixed(2)} AE`}</Button>
                </div>
              </React.Fragment>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DepositToken;
