import { Input } from "@/components/ui/input";
import {
  User,
  useGetUsersAlreadyAddedQuery,
  useGetUsersByNameQuery,
  useSendNotificationMutation,
} from "@/gql/generated/schema";
import { useEffect, useState } from "react";
import { UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NotificationTypeEnum } from "@/types/global";

export const FriendList = () => {
  const { currentUser } = useCurrentUser();
  const [sendNotification] = useSendNotificationMutation();

  const { data: usersAlreadyAdded, refetch: refetchUsersAlreadyAdded } =
    useGetUsersAlreadyAddedQuery();
  const usersAdded = usersAlreadyAdded?.getUsersAlreadyAdded || [];

  const [search, setSearch] = useState("");
  const { data: foundUsers, refetch } = useGetUsersByNameQuery({
    variables: { name: search },
  });
  const searchedUsers = foundUsers?.getUsersByName;

  useEffect(() => {
    refetch();
  }, [search]);

  const handleAddFriend = async (user: User) => {
    if (!currentUser) return;
    try {
      await sendNotification({
        variables: {
          data: {
            receiverId: user.id,
            type: NotificationTypeEnum.FRIEND_REQUEST,
            groupId: null,
          },
        },
      });
      refetchUsersAlreadyAdded();
      setSearch("");
    } catch (error) {
      console.error(error);
    }
  };

  const displayUser = (user: any, idx: number) => {
    if (usersAdded.findIndex((val) => val.id === user.id) !== -1) return;

    return (
      <div
        key={idx}
        className="flex justify-between bg-card py-2 px-4 rounded-3xl"
      >
        <p>
          {user.firstName} {user.lastName}
        </p>
        <Button
          variant="secondary"
          className="p-0 w-6 h-6"
          onClick={() => handleAddFriend(user)}
        >
          <UserPlus2 className="text-white w-5 h-5" />
        </Button>
      </div>
    );
  };

  const displayAlreadAddedUsers = () => {
    return usersAdded.map((user, idx) => (
      <div key={idx}>
        {user.firstName} {user.lastName}
      </div>
    ));
  };

  return (
    <div className="px-3 space-y-4">
      {/* INPUT D'AJOUT */}
      <div>
        <h3 className="font-bold mb-1">Ajouter un ami</h3>
        <Input onChange={(e) => setSearch(e.target.value)} />
        {searchedUsers && (
          <div className="flex flex-col gap-2 mt-3">
            {searchedUsers.map((user, idx) => displayUser(user, idx))}
          </div>
        )}
      </div>

      {/* DEMANDES EN ATTENTES */}
      <div>
        {usersAdded.length > 0 && (
          <>
            <h2 className="font-bold">Demandes en attentes</h2>
            {displayAlreadAddedUsers()}
          </>
        )}
      </div>

      {/* LISTE D'AMIS */}
      <div>
        <h2 className="font-bold">Liste d'amis</h2>
        <div className="flex flex-col gap-2 mt-3">
          {currentUser?.friends && currentUser.friends.length > 0 ? (
            currentUser.friends.map((friend, idx) => (
              <p key={idx}>
                {friend.firstName} {friend.lastName}
              </p>
            ))
          ) : (
            <p>Vous n'avez pas encore d'amis...</p>
          )}
        </div>
      </div>
    </div>
  );
};
