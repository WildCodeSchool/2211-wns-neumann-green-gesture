import { Button } from "@/components/ui/button";
import { useGetUserEcoActionQuery } from "@/gql/generated/schema";
import { ArrowLeft, Loader, ThumbsUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../pages/Loading";
import EcoActionDetailsCard from "@/components/EcoActionDetailsCard";

const SingleEcoAction = () => {
  const navigate = useNavigate();
  const { ecoActionId, groupId } = useParams();

  const { data, loading } = useGetUserEcoActionQuery({
    variables: {
      ecoActionId: parseInt(ecoActionId || "0", 10),
      groupId: parseInt(groupId || "0", 10),
    },
  });
  const ecoAction = data?.getUserEcoAction;

  if (loading || !ecoAction) return <Loading />;

  return (
    <div className="px-4 mt-5">
      <div className="flex justify-start">
        <Button
          className=" rounded-full w-auto h-10 p-2"
          onClick={() => navigate(`/group/${groupId}`)}
        >
          <ArrowLeft />
        </Button>
      </div>
      <EcoActionDetailsCard
        name={ecoAction?.ecoAction[0].name}
        likes={ecoAction?.ecoAction[0].likes}
        description={ecoAction?.ecoAction[0].description}
      />
      <Button className="bg-accent-blue w-full hover:bg-[#0061c7]">
        J'ai réalisé ce défi
      </Button>
    </div>
  );
};

export default SingleEcoAction;
