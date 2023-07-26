import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetUserEcoActionQuery } from "@/gql/generated/schema";
import EcoActionDetailsCard from "@/components/EcoActionDetailsCard";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Loading } from "@/pages/Loading";
import Validation from "@/components/Validation";

const SingleEcoAction = () => {
  const { ecoActionId, groupId } = useParams();
  const navigate = useNavigate();

  const [hide, setHide] = useState(false);

  const { data, loading } = useGetUserEcoActionQuery({
    variables: {
      ecoActionId: parseInt(ecoActionId || "0", 10),
      groupId: parseInt(groupId || "0", 10),
    },
  });
  const ecoAction = data?.getUserEcoAction;

  if (loading || typeof ecoAction === "undefined") return <Loading />;

  return (
    <div className="px-4 my-5">
      <div className="flex justify-start items-center">
        <Button
          className=" rounded-full w-auto h-10 p-2"
          onClick={() => navigate(`/group/${groupId}`)}
        >
          <ArrowLeft />
        </Button>
        <h1 className="ms-3 font-semibold">
          {ecoAction?.ecoAction?.[0]?.groups?.[0]?.challengeName}
        </h1>
      </div>

      <EcoActionDetailsCard
        name={ecoAction?.ecoAction[0].name}
        likes={ecoAction?.ecoAction[0].likes}
        description={ecoAction?.ecoAction[0].description}
      />

      {!hide && !ecoAction.validationId && (
        <Button
          className="bg-accent-blue w-full hover:bg-[#0061c7]"
          onClick={() => {
            setHide(!hide);
          }}
        >
          J'ai réalisé ce défi
        </Button>
      )}

      {hide && <Validation setHide={setHide} />}

      {ecoAction.validationId && (
        <div className="mt-5 bg-light-green p-3 rounded-xl flex flex-col items-center">
          <h2 className="font-semibold">Ma note</h2>
          <p className="my-2 text-blue-600 font-semibold">6 points</p>
          <h3 className="font-semibold mb-3">Ma preuve</h3>
          {ecoAction?.proof ? (
            <div className=" h-[150px] w-[90%] bg-slate-300 rounded-xl"></div>
          ) : (
            <div className=" h-[150px] w-[90%] bg-slate-300 rounded-xl">
              Ajouter une preuve
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleEcoAction;
