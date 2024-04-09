'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from "@/libs/utils";
import SuperheroLogo from '@/assets/logos/superhero-icon.png';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ErrorIcon from '@/assets/icons/error-icon-1.png';
import { createDeepLinkUrl } from "@/libs/ae-utils";

interface IConfirmWalletDialog {
   userRejected: boolean; handleConnect: () => void; isScanningWallet: boolean; isConnecting: boolean; walletInfo: { info: any };
   open: boolean; setOpen: (arg: boolean) => void;
}

const ConfirmWalletDialog = ({ ...props }: IConfirmWalletDialog) => {

    const handleConnectAgain = () => {
      const addressDeepLink = createDeepLinkUrl({
        type: 'address',
        'x-success': `${window.location.href.split('?')[0]}?address={address}&networkId={networkId}`,
        'x-cancel': window.location.href.split('?')[0],
      });
      window.location.href = addressDeepLink.toString();
    }

    return (
        <Dialog onOpenChange={props.setOpen} open={props.open}>
        <DialogTrigger asChild>
            </DialogTrigger>
      <DialogContent className="dark:bg-[#191919] bg-light">
              <DialogHeader>
                <DialogTitle className={cn("font-medium py-3")}>
                 {props.userRejected ? 'Error Occured!' : 'Connect a wallet'}
                </DialogTitle>
                <DialogDescription className='font-light my-4 w-full'>
                  {props.userRejected ? <div className='text-center space-y-4'>
                    <Image src={ErrorIcon} alt="error icon" width={80} className='mx-auto' />
                    <p className='px-8'>Login with your wallet failed. Please make sure that you are logged into your wallet.</p>
                        <Button className='w-full' onClick={handleConnectAgain}>Try again!</Button>
                  </div> : (
  
                    <div className='p-2 border dark:border-[#292929] dark:bg-[#191919] rounded-lg w-full bg-white border-white'>
                    {props.isScanningWallet ? <div className='flex items-center space-x-2 h-9'>
                      <p>Scanning for wallet...</p>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </div> : (
                      <>
                      {(!props.walletInfo.info && !props.isScanningWallet) ? (<p className='font-light text-sm'>You don't have Superhero Wallet. Click <a className='text-primary font-medium' href="chrome-extension://mnhmmkepfddpifjkamaligfeemcbhdne/index.html#/account" target='_blank'>here</a> to install Superhero</p>) : 
                      <div className='flex items-center justify-between space-x-2'>
                          <div className='flex items-center space-x-3 md:w-[40%]'>
                            <Image src={SuperheroLogo} alt="superhero" width={40} />
                            <h2 className='text-white md:font-medium text-[12px] md:text-[18px]'>Super Hero Wallet</h2>
                          </div>
                            <Button className='rounded-lg md:w-[30%] h-9 text-xs md:text-sm' loading={props.isConnecting} loadingText='Connecting...' onClick={props.handleConnect}>Connect</Button>
                        </div>
                      }
                      </>
                    )}
                    
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
  </Dialog>
    )
};

export default ConfirmWalletDialog;