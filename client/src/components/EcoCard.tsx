import {
  useGetMaxValidationPointsQuery,
  useGetUserEcoActionQuery,
  useGetValidationQuery,
  useLikeEcoActionMutation,
} from "@/gql/generated/schema";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Loading } from "@/pages/Loading";
import EcoActionDetailsCard from "./EcoActionDetailsCard";
import Validation from "./Validation";
import ValidationDetails from "./ValidationDetails";

interface EcoCardProps {
  name: string;
  description: string;
  ecoActionId: number;
  likes: number;
  groupId: number;
}

const EcoCard = ({
  name,
  description,
  ecoActionId,
  likes,
  groupId,
}: EcoCardProps) => {
  const { data, loading, refetch } = useGetUserEcoActionQuery({
    variables: { groupId, ecoActionId },
  });
  const userEcoAction = data?.getUserEcoAction;

  const { data: validationData, loading: validationLoading } =
    useGetValidationQuery({
      variables: {
        getValidationId: userEcoAction?.validationId || 0,
      },
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
            hasLiked: !userEcoAction?.hasLiked,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  if (loading || validationLoading) return <Loading />;

  return (
    <motion.div
      key={ecoActionId}
      initial={{ x: -100 }}
      animate={{ x: 0, transition: { duration: 0.2 } }}
      exit={{ x: 100 }}
      className="h-full"
    >
      <div className="w-[100%] rounded-xl bg-grey-green my-5 px-3 pb-4 pt-2 hover:shadow-2xl transition ease-in-out delay-90">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-sans text-xs">
            {name} {validation?.points} / {maxPoints?.points}
          </h3>
          <Heart
            className={userEcoAction?.hasLiked ? "text-[#FF0101] w-4" : "w-4"}
            onClick={() => handleLike()}
          />
        </div>
        <p className="font-sans text-2xs">
          {`${description.slice(0, 300)}...`}
        </p>
        <div className="flex justify-between items-center mt-3">
          <EcoActionDetailsCard
            name={name}
            likes={likes}
            description={description}
          />
          {userEcoAction === undefined ? (
            <Validation
              ecoActionId={ecoActionId}
              groupId={groupId}
              refetchParent={refetch}
            />
          ) : (
            <ValidationDetails groupId={groupId} ecoActionId={ecoActionId} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EcoCard;
