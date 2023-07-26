import {
  useGetMaxValidationPointsQuery,
  useGetUserEcoActionQuery,
  useGetValidationQuery,
  useLikeEcoActionMutation,
} from "@/gql/generated/schema";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/pages/Loading";

interface EcoCardProps {
  name: string;
  description: string;
  ecoActionId: number;
  groupId: number;
}

const EcoCard = ({ name, description, ecoActionId, groupId }: EcoCardProps) => {
  const navigate = useNavigate();

  const { data, loading, refetch } = useGetUserEcoActionQuery({
    variables: { ecoActionId: ecoActionId, groupId: groupId },
  });
  const ecoAction = data?.getUserEcoAction;

  const { data: validationData, loading: validationLoading } =
    useGetValidationQuery({
      skip: !ecoAction?.validationId,
      variables: { getValidationId: ecoAction?.validationId! },
    });
  const validation = validationData?.getValidation;

  const { data: maxPointsData, loading: maxPointsLoading } =
    useGetMaxValidationPointsQuery({
      variables: { ecoActionId },
    });
  const maxPoints = maxPointsData?.getMaxValidationPoints;

  const [LikeEcoAction] = useLikeEcoActionMutation();

  const handleLike = async () => {
    console.log(ecoAction);

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

  if (loading) return <Loading />;

  return (
    <motion.div
      key={ecoActionId}
      initial={{ x: -100 }}
      animate={{ x: 0, transition: { duration: 0.2 } }}
      exit={{ x: 100 }}
      className="h-full"
    >
      <div
        className="w-[100%] rounded-xl bg-grey-green my-5 px-3 pb-4 pt-2 hover:shadow-2xl transition ease-in-out delay-90"
        // onClick={() =>
        //   navigate(`/single-ecoaction/${ecoActionId}/${groupId}`)
        // }
      >
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-sans text-xs">
            {name} {validation?.points} / {maxPoints?.points}
          </h3>
          <Heart
            className={ecoAction?.hasLiked ? "text-[#FF0101] w-4" : "w-4"}
            onClick={() => handleLike()}
          />
        </div>
        <p className="font-sans text-2xs">{description}</p>
      </div>
    </motion.div>
  );
};

export default EcoCard;
