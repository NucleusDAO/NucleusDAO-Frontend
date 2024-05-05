import { Bell2 } from '@/assets/svgs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';
import RoundedIcon from '@/assets/icons/roundedIcon.png';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ApiContext } from '@/context/api-context';
import React, { useContext } from 'react';
import NotificationLoading from './loading/notification-loading';
import { formatTimestamp } from '@/libs/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAllNotificationsAsRead } from '@/config/apis';
import { ConnectWalletContext } from '@/context/connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';
import { toast } from 'sonner';
import { NOTIFICATIONS } from '@/libs/key';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { DAO_URL } from '@/config/path';

const ViewNotificationPopover = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const queryClient: any = useQueryClient();
  const {
    user: { address },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const {
    notifications,
    isNotificationError,
    notificationErrorMessage,
    isLoadingNotification,
  } = useContext(ApiContext);

  const { mutate, isPending } = useMutation({
    mutationFn: () => markAllNotificationsAsRead(address),
    onSuccess: (response: any) => {
      toast.success(response.message || 'User profile updated successfully.');
      queryClient.invalidateQueries(NOTIFICATIONS);
    },
    onError: (error: any) => toast.error(error.message),
  });

  console.log(notifications, '-> notifications');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="dark:bg-[#1E1E1E] bg-white h-11 w-12 justify-center rounded-lg flex items-center relative dark:text-white text-[#444444]"
          role="button"
        >
          <div className="w-1.5 h-1.5 top-4 bg-[#DD3857] rounded-full absolute right-4" />
          <Bell2 />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="mt-2 md:px-6 pt-3 pb-8 md:w-[430px] dark:bg-gradient-to-r dark:from-[#1E1E1E] dark:to-[#252525]"
        style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
      >
        <div className="flex justify-between items-center text-sm border-b pb-3 dark:border-b-[#292929] border-b-[#CCCCCC99] font-light">
          <p className="font-medium dark:text-[#F5F5F5] text-dark">
            Notifications
          </p>
          <div
            className="text-primary flex space-x-2 items-center"
            role="button"
            onClick={() => mutate()}
          >
            <p>Mark All as Read</p>
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </div>
        </div>

        {isLoadingNotification ? (
          <NotificationLoading />
        ) : (
          <React.Fragment>
            {isNotificationError && (
              <p className="text-sm text-[#888888] pt-8 text-center">
                {notificationErrorMessage.message}
              </p>
            )}
            {notifications.length === 0 && (
              <p className="text-sm text-[#888888] pt-8 text-center">
                You have no notifications
              </p>
            )}

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map(
                (notification: {
                  title: string;
                  message: string;
                  time: string;
                  read: string;
                  extra: { daoId: string };
                }) => (
                  <Link
                    href={
                      notification.extra
                        ? `${DAO_URL}/${notification.extra.daoId}/dashboard`
                        : '#'
                    }
                  >
                    <div
                      key={notification.title}
                      className="flex space-x-3 text-sm space-y-5 justify-start mt-3 hover:dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] hover:cursor-pointer rounded-md px-4 py-1 trans"
                    >
                      <div className="mt-4">
                        <Image
                          src={RoundedIcon}
                          alt="logo"
                          width={isDesktop ? 40 : 25}
                          height={isDesktop ? 40 : 25}
                        />
                      </div>
                      <div className="space-y-2 w-[70%] md:w-full">
                        <p className="dark:text-[#F5F5F5] text-dark">
                          {notification.title}
                        </p>
                        <p className="font-light text-[#888888] break-words whitespace-normal">
                          {notification.message}
                        </p>
                        <p className="text-[12px] text-[#444444]">
                          {formatTimestamp(notification.time)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-1.5 h-1.5 bg-[#DD3857] rounded-full mr-4" />
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          </React.Fragment>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ViewNotificationPopover;
