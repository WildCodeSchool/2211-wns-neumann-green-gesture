import {
  GetGroupQuery,
  GetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";

type RankingByTeamProps = {
  teams: GetGroupQuery["getGroup"]["teams"];
  userEcoActions: GetUserEcoActionsByGroupIdQuery["getUserEcoActionsByGroupId"];
  totalMaxPoints: number;
};

const RankingByTeam = ({
  teams,
  userEcoActions,
  totalMaxPoints,
}: RankingByTeamProps) => {
  return (
    <>
      {teams.map((team) => {
        if (!team || !team.users) return null;
        return (
          <div key={team.id}>
            <div className="flex justify-between pt-5" key={team.id}>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{team.name}</NavigationMenuTrigger>
                    {team?.users?.map((user) => (
                      <NavigationMenuContent key={user.id}>
                        <NavigationMenuLink className="text-xs">
                          {user.firstName}
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    ))}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <p className="text-[.9rem] font-bold">
                {`${team?.users
                  ?.map((user) =>
                    userEcoActions
                      ?.filter((ua) => ua.user.id === user.id)
                      .reduce((acc, curr) => acc + (curr.points ?? 0), 0)
                  )
                  .reduce((acc, curr) => (acc ?? 0) + (curr ?? 0), 0)} / ${
                  totalMaxPoints * team?.users.length
                } points`}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RankingByTeam;
