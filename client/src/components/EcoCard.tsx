import { useEffect, useState } from "react";
import {
  useGetMaxValidationPointsQuery,
  useGetUserEcoActionQuery,
  useGetValidationQuery,
  useLikeEcoActionMutation,
} from "@/gql/generated/schema";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Loading } from "@/pages/Loading";
import EcoActionDetailsCard from "./EcoActionDetailsCard";
import Validation from "./Validation";
import ValidationDetails from "./ValidationDetails";

interface EcoCardProps {
  name: string;
  description: string;
  ecoActionId: number;
  groupId: number;
}

const EcoCard = ({ name, description, ecoActionId, groupId }: EcoCardProps) => {
  const { data, loading, refetch } = useGetUserEcoActionQuery({
    variables: { ecoActionId: ecoActionId, groupId: groupId },
  });
  const ecoAction = data?.getUserEcoAction;

  const { data: validationData, loading: validationLoading } =
    useGetValidationQuery({
      variables: { getValidationId: ecoAction?.validationId || 0 },
    });
  const validation = validationData?.getValidation;

  const { data: maxPointsData, loading: maxPointsLoading } =
    useGetMaxValidationPointsQuery({
      variables: { ecoActionId },
    });
  const maxPoints = maxPointsData?.getMaxValidationPoints;

  const [LikeEcoAction] = useLikeEcoActionMutation();

  const handleLike = async () => {
    try {
      await LikeEcoAction({
        variables: {
          data: {
            ecoActionId: ecoActionId,
            groupId: groupId,
            hasLiked: !ecoAction?.hasLiked,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  if (
    loading ||
    validationLoading ||
    typeof ecoAction === "undefined" ||
    typeof validation === "undefined"
  )
    return <Loading />;

  return (
    <AnimatePresence>
      <motion.div
        key={ecoActionId}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
        exit={{ x: 300, opacity: 0 }}
        className="h-full"
      >
        <div className="w-[100%] rounded-xl bg-grey-green my-5 px-3 pb-4 pt-2 hover:shadow-2xl transition ease-in-out delay-90">
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-sans text-xs">
              {name} {validation?.points} / {maxPoints?.points}
            </h3>
            <Heart
              className={ecoAction?.hasLiked ? "text-[#FF0101] w-4" : "w-4"}
              onClick={() => handleLike()}
            />
          </div>
          <p className="font-sans text-2xs">
            {`${description.slice(0, 300)}...`}
          </p>
          <div className="flex justify-between items-center mt-3">
            <EcoActionDetailsCard
              name={ecoAction?.ecoAction[0].name}
              likes={ecoAction?.ecoAction[0].likes}
              description={ecoAction?.ecoAction[0].description}
            />
            {!ecoAction.validationId ? (
              <Validation userEcoActionId={ecoAction?.id} />
            ) : (
              <ValidationDetails
                points={validation.points}
                proof={ecoAction?.proof}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EcoCard;
