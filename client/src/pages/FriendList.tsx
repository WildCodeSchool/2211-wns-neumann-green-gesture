import { Input } from "@/components/ui/input";
import {
  User,
  useGetCurrentUserQuery,
  useGetUsersAlreadyAddedQuery,
  useGetUsersByNameQuery,
  useSendNotificationMutation,
} from "@/gql/generated/schema";
import { useEffect, useState } from "react";
import { UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

enum NotificationStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

enum NotificationTypeEnum {
  CHALLENGE_REQUEST = "challenge_request",
  FRIEND_REQUEST = "friend_request",
}

export const FriendList = () => {
  const { data: currentUserData } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });

  const currentUser = currentUserData?.getCurrentUser;

  const { data: usersAlreadyAdded } = useGetUsersAlreadyAddedQuery();
  const [usersAdded, setUsersAdded] = useState(
    usersAlreadyAdded?.getUsersAlreadyAdded ?? []
  );

  console.log(usersAlreadyAdded);

  const [search, setSearch] = useState("");
  const { data: foundUsers, refetch } = useGetUsersByNameQuery({
    variables: { name: search },
  });
  const searchedUsers = foundUsers?.getUsersByName;

  const [sendNotification] = useSendNotificationMutation();

  useEffect(() => {
    refetch();
  }, [search]);

  const displayUser = (user: any, idx: number) => {
    if (usersAdded) return;
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
    return usersAdded.map((user, idx) => <div key={idx}>{user.firstName}</div>);
  };

  const handleAddFriend = async (user: User) => {
    if (!currentUser) return;
    setUsersAdded([...usersAdded, user]);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4">
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

      <div className="mt-4">
        <h3 className="font-bold mb-2">Ajouter un ami</h3>
        <Input onChange={(e) => setSearch(e.target.value)} />
        {searchedUsers && (
          <div className="flex flex-col gap-2 mt-3">
            {searchedUsers.map((user, idx) => displayUser(user, idx))}
          </div>
        )}
      </div>

      {displayAlreadAddedUsers()}
    </div>
  );
};
