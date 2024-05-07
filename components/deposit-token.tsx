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
import { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { handleChangeNumberInput } from '@/libs/utils';
import { EachDaoContext } from '@/context/each-dao-context';
import { ApiContext } from '@/context/api-context';

const DepositToken = () => {
  const [aeValue, setAeValue] = useState<number | string>(0);
  const [usdValue, setUsdValue] = useState<number | string>(0);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const { getAEPrice } = useContext(ApiContext);

  useEffect(() => {
    setUsdValue(aeValue);
  }, [aeValue]);
  console.log(getAEPrice, '-> getdjd');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Deposit Token</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-[#292929] dark:text-white font-medium py-2">
            Deposit Funds
          </DialogTitle>
          <DialogDescription className="font-light space-y-3">
            <p>Kindly input the amount below.</p>
            <div className="space-y-4">
              <p className="text-white">Token</p>
              <div className="border border-[#292929] rounded-lg p-2 flex justify-between">
                <div className="relative w-[40%]">
                  <Input
                    placeholder="0.00"
                    className=""
                    defaultValue={aeValue}
                    value={aeValue}
                    onChange={({ target }) =>
                      handleChangeNumberInput(target.value, setAeValue)
                    }
                  />
                  <p className="dark:text-white right-4 text-dark absolute top-[27%] font-medium">
                    AE
                  </p>
                </div>
                <div className="relative w-[40%]">
                  <Input
                    placeholder="0.00"
                    className=""
                    defaultValue={usdValue}
                    value={usdValue}
                    onChange={({ target }) =>
                      handleChangeNumberInput(target.value, setUsdValue)
                    }
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
                  onCheckedChange={(value: boolean) => setTermsChecked(value)}
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
                disabled={!termsChecked || Number(usdValue) <= 0}
              >{`Deposit $${usdValue}`}</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DepositToken;
