import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import DisplayDate from "@/components/DisplayDate";
import { Badge } from "@/components/ui/badge";
import {
  useGetCommentsForGroupQuery,
  useGetGroupQuery,
  useGetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";
import { Loading } from "./Loading";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowChallengeParticipants from "@/components/ShowChallengeParticipants";
import ShowChallengeComments from "@/components/ShowChallengeComments";
import EcoCard from "@/components/EcoCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SingleGroup = () => {
  const { id = "0" } = useParams();

  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: parseInt(id || "0", 10) },
  });
  const challenge = challengeData?.getGroup;

  const { data: commentData, loading: commentLoading } =
    useGetCommentsForGroupQuery({
      variables: { groupId: challenge?.id || 0 },
    });
  const comments = commentData?.getCommentsForGroup;

  const { data: userEcoActionData } = useGetUserEcoActionsByGroupIdQuery({
    variables: { groupId: challenge?.id || 0 },
  });
  const userEcoActions = userEcoActionData?.getUserEcoActionsByGroupId;

  const { currentUser, loading: currentUserLoading } = useCurrentUser();

  const getTotalMaxPoints = () => {
    let total = 0;
    challenge?.ecoActions.forEach((eco) => {
      total += Math.max(...eco.validations.map((v) => v.points));
    });
    return total;
  };
  const totalMaxPoints = getTotalMaxPoints();

  if (groupLoading || commentLoading || currentUserLoading) return <Loading />;

  return (
    <>
      <h1 className="text-2xl font-bold">{challenge?.challengeName}</h1>
      <div className="space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2 md:gap-8 md:justify-start">
          <p className="text-sm">
            Créé par{" "}
            <span className="font-bold">
              {challenge?.author.firstName} {challenge?.author.lastName}
            </span>
          </p>
          <DisplayDate
            startDate={challenge?.startDate}
            endDate={challenge?.endDate}
          />
        </div>
        <div className="flex justify-between items-center gap-2 md:gap-6 md:justify-start">
          <ShowChallengeParticipants
            component={
              <Badge
                variant="terciary"
                className="px-5 py-3 w-full justify-center"
              >
                {challenge?.users.length ?? 0} participants
              </Badge>
            }
            participants={challenge?.users ?? []}
          />
          <ShowChallengeComments
            component={
              <Badge
                variant="terciary"
                className="px-5 py-3 w-full justify-center md:w-auto"
              >
                {comments?.length} commentaires
              </Badge>
            }
            comments={comments ?? []}
          />
        </div>
      </div>
      <div className="mt-7">
        <Tabs defaultValue="defis" className="w-full">
          <TabsList className="w-full bg-transparent p-0">
            <TabsTrigger
              value="defis"
              className="w-full rounded-none text-medium-green font-normal border-b-2 border-b-transparent  data-[state=active]:shadow-none  data-[state=active]:border-b-primary"
            >
              Défis
            </TabsTrigger>
            <TabsTrigger
              value="classement"
              className="w-full rounded-none text-medium-green font-normal border-b-2 border-b-transparent  data-[state=active]:shadow-none  data-[state=active]:border-b-primary"
            >
              Classement
            </TabsTrigger>
          </TabsList>
          <AnimatePresence>
            <TabsContent key="defis" value="defis">
              <div>
                {challenge?.ecoActions.map((eco) => (
                  <EcoCard
                    key={eco.id}
                    name={eco.name}
                    description={eco.description}
                    ecoActionId={eco.id}
                    likes={eco.likes}
                    groupId={challenge.id}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent key="classement" value="classement">
              <motion.div
                key={2}
                initial={{ x: 100 }}
                animate={{ x: 0, transition: { duration: 0.25 } }}
                exit={{ x: -100 }}
              >
                <div>
                  {challenge?.teams.length
                    ? challenge?.teams.map((team) => {
                        if (!team || !team.users) return null;
                        return (
                          <div key={team.id}>
                            <div
                              className="flex justify-between pt-5"
                              key={team.id}
                            >
                              <NavigationMenu>
                                <NavigationMenuList>
                                  <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                      {team.name}
                                    </NavigationMenuTrigger>
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
                                      .reduce(
                                        (acc, curr) => acc + (curr.points ?? 0),
                                        0
                                      )
                                  )
                                  .reduce(
                                    (acc, curr) => (acc ?? 0) + (curr ?? 0),
                                    0
                                  )} / ${totalMaxPoints} points`}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    : challenge?.users.map((user) => (
                        <div
                          className="flex justify-between pt-5"
                          key={user.id}
                        >
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
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </>
  );
};

export default SingleGroup;
