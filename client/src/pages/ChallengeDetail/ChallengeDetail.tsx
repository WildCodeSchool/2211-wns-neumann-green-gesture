import DisplayDate from "@/components/DisplayDate";
import EcoCarde from "@/components/EcoCarde";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetCommentsForGroupQuery,
  useGetCurrentUserQuery,
  useGetGroupQuery,
} from "@/gql/generated/schema";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import {
//   NavigationMenuItem,
//   NavigationMenuLink,
//   navigationMenuTriggerStyle,
// } from "../../../components/ui/navigation-menu";

const ChallengeDetail = () => {
  const { id = "0" } = useParams();
  const [mode, setMode] = useState(false);

  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: parseInt(id, 10) || 0 },
  });
  const challenge = challengeData?.getGroup;

  const { data: commentData, loading: commentLoading } =
    useGetCommentsForGroupQuery({
      variables: { groupId: challenge?.id || 0 },
    });
  const comments = commentData?.getCommentsForGroup;

  const { data: currentUserData, loading: currentUseLoading } =
    useGetCurrentUserQuery();

  if (groupLoading || commentLoading || currentUseLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <div className="px-4">
        <h1 className="font-sans text-2xl font-bold">
          {challenge?.challengeName}
        </h1>
        <div className="flex flex-col">
          <div className="flex justify-between items-center pt-1">
            <p>
              Créé par {challenge?.author.firstName}{" "}
              {challenge?.author.lastName}
            </p>
            <DisplayDate
              startDate={challenge?.startDate}
              endDate={challenge?.endDate}
            />
          </div>
          <div className="flex justify-between items-center pt-3">
            <Badge variant={"terciary"} className={"px-5"}>
              {challenge?.users.length ?? 0} partisipants
            </Badge>
            <Badge variant={"terciary"} className={"px-5"}>
              {comments?.length} commentaires
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-6">
        <button
          className={`font-sans text-[.8rem] w-[50%] pb-2 ${
            !mode && "border-b-2 "
          } transition ease-in-out delay-90`}
          onClick={() => setMode(false)}
        >
          Défis
        </button>
        <button
          className={`font-sans text-[.8rem] w-[50%] pb-2 ${
            mode && "border-b-2 "
          } transition ease-in-out delay-90`}
          onClick={() => setMode(true)}
        >
          Classement
        </button>
      </div>

      {!mode ? (
        <div className="px-4">
          {challenge?.ecoActions.map((eco) => (
            <EcoCarde
              key={eco.id}
              name={eco.name}
              description={eco.description}
              ecoActionId={eco?.id || 0}
              groupId={challenge?.id || 0}
            />
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={2}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ x: -300, opacity: 0 }}
            className="h-full"
          >
            <div className="px-4">
              {currentUserData?.getCurrentUser?.subscriptionType ===
                "partner" && challenge?.teams.length
                ? challenge?.teams.map((team) => (
                    <div key={team.id}>
                      <div className="flex justify-between pt-5" key={team.id}>
                        <p className="text-[.9rem]">Group {team.id}</p>
                        <p className="text-[.9rem] font-bold">
                          120/{challenge.ecoActions.length * 9} points
                        </p>
                      </div>
                      {team?.users?.map((user) => (
                        <p key={user.id}>{user.firstName}</p>
                      ))}
                    </div>
                  ))
                : challenge?.users.map((user) => (
                    <div className="flex justify-between pt-5" key={user.id}>
                      <p className="text-[.9rem]">{user.firstName}</p>
                      <p className="text-[.9rem] font-bold">
                        120/{challenge.ecoActions.length * 9} points
                      </p>
                    </div>
                  ))}
              {/* <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem> */}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ChallengeDetail;
