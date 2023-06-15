type NotificationProps = {
  icon: React.ReactNode;
  title: string;
  message: string | React.ReactNode;
};

export const Notification = ({ icon, title, message }: NotificationProps) => {
  return (
    <>
      <div className="flex gap-4 shadow-main px-4 py-3 rounded-xl">
        {icon}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold">{title}</h4>
          <div className="text-xs">{message}</div>
        </div>
      </div>
    </>
  );
};
