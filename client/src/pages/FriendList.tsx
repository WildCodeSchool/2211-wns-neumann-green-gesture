import { Input } from "@/components/ui/input";
import {
  useAddFriendMutation,
  useGetCurrentUserQuery,
  useGetUsersByNameQuery,
} from "@/gql/generated/schema";
import { useEffect, useState } from "react";
import { UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FriendList = () => {
  const { data: currentUserData, refetch: refetchFriendList } =
    useGetCurrentUserQuery({
      errorPolicy: "ignore",
    });
  const currentUser = currentUserData?.getCurrentUser;

  const [search, setSearch] = useState("");
  const { data: foundUsers, refetch } = useGetUsersByNameQuery({
    variables: { name: search },
  });
  const searchedUsers = foundUsers?.getUsersByName;

  const [addFriend] = useAddFriendMutation();

  useEffect(() => {
    refetch();
  }, [search]);

  const handleAddFriend = async (id: number) => {
    try {
      await addFriend({
        variables: {
          friendId: id,
        },
      });
      refetch();
      refetchFriendList();
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
            {searchedUsers.map((user, idx) => (
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
                  onClick={() => handleAddFriend(user.id)}
                >
                  <UserPlus2 className="text-white w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
