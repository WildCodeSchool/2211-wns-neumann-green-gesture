import {
  GetGroupQuery,
  GetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";

type RankingByUserProps = {
  users: GetGroupQuery["getGroup"]["users"];
  userEcoActions: GetUserEcoActionsByGroupIdQuery["getUserEcoActionsByGroupId"];
  totalMaxPoints: number;
};

const RankingByUser = ({
  users,
  userEcoActions,
  totalMaxPoints,
}: RankingByUserProps) => {
  return (
    <>
      {users.map((user) => (
        <div className="flex justify-between pt-5" key={user.id}>
          <p className="text-[.9rem]">{user.firstName}</p>
          <p className="text-[.9rem] font-bold">
            {" "}
            {`${userEcoActions
              ?.filter((ua) => ua.user.id === user.id)
              .reduce(
                (acc, curr) => acc + (curr.points ?? 0),
                0
              )} / ${totalMaxPoints} points`}
          </p>
        </div>
      ))}
    </>
  );
};

export default RankingByUser;
