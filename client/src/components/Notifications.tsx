import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Notification } from "./ui/notification";
import { useGetNotificationsQuery } from "@/gql/generated/schema";
import { NotificationTypeEnum } from "@/types/global";

function Notifications() {
  const {
    data: getNotifs,
    refetch: refetchNotifs,
    loading,
  } = useGetNotificationsQuery();
  const notifs = getNotifs?.getNotifications || [];

  const handleTraitedNotifs = () => {
    refetchNotifs();
  };

  return (
    <Sheet onOpenChange={(openState) => openState && refetchNotifs()}>
      <SheetTrigger asChild={true}>
        <div className="relative">
          <Button className="rounded-full p-2">
            <Bell color="#e8eede" />
          </Button>
          <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-accent-orange"></span>
        </div>
      </SheetTrigger>
      <SheetContent position="right" className="w-full md:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl">Notifications</SheetTitle>
          {notifs.length === 0 && (
            <SheetDescription>Aucune notifications...</SheetDescription>
          )}
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {notifs.map((notif) => (
            <Notification
              key={notif.id}
              type={notif.type as NotificationTypeEnum}
              sender={notif.sender}
              notifId={notif.id}
              handleTraitedNotifs={handleTraitedNotifs}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Notifications;
