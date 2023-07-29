import { Bell, UserPlus } from "lucide-react";

import { NotificationStatusEnum, NotificationTypeEnum } from "@/types/global";
import { Button } from "./button";
import {
  useAddFriendMutation,
  useUpdateNotificationStatusMutation,
} from "@/gql/generated/schema";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type NotificationProps = {
  type: NotificationTypeEnum;
  sender: any;
  notifId: number;
  handleTraitedNotifs: () => void;
};

export const Notification = ({
  type,
  sender,
  notifId,
  handleTraitedNotifs,
}: NotificationProps) => {
  const { refetchCurrentUser } = useCurrentUser();
  const [updateStatusMutation] = useUpdateNotificationStatusMutation();
  const [addFriend] = useAddFriendMutation();

  const icon =
    type === NotificationTypeEnum.FRIEND_REQUEST ? <UserPlus /> : <Bell />;

  const handleAcceptNotif = async () => {
    try {
      await updateStatusMutation({
        variables: {
          data: {
            notificationId: notifId,
            status: NotificationStatusEnum.ACCEPTED,
          },
        },
      });

      if (type === NotificationTypeEnum.FRIEND_REQUEST) {
        await addFriend({
          variables: {
            friendId: sender.id,
          },
        });
      }

      handleTraitedNotifs();
      refetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefuseNotif = async () => {
    try {
      await updateStatusMutation({
        variables: {
          data: {
            notificationId: notifId,
            status: NotificationStatusEnum.REJECTED,
          },
        },
      });

      // TODO: handle if notif from challenge

      handleTraitedNotifs();
      refetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  const notifMessage = () => {
    if (type === NotificationTypeEnum.FRIEND_REQUEST) {
      return (
        <div>
          <p className="text-sm">
            <span className="font-semibold mr-2">
              {sender.firstName} {sender.lastName}
            </span>
            vous a envoyé une demande d'amis
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex gap-4 shadow-main px-4 py-3 rounded-xl">
        {icon}
        <div className="flex flex-col gap-1">
          {notifMessage()}
          <div className="flex items-center gap-1 mt-2">
            <Button
              onClick={handleAcceptNotif}
              type="button"
              variant="secondary"
              className="w-full text-xs"
              size="icon"
            >
              Accepter
            </Button>
            <Button
              onClick={handleRefuseNotif}
              type="button"
              variant="destructive"
              className="w-full text-xs"
              size="icon"
            >
              Refuser
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
