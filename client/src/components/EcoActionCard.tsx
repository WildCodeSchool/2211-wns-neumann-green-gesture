import { EcoActionType } from "@/types/global";
import EcoActionDetailsCard from "./EcoActionDetailsCard";
import { Button } from "./ui/button";
import {
  GetUserEcoActionsDocument,
  useDeleteEcoActionMutation,
} from "@/gql/generated/schema";
import { X } from "lucide-react";

interface EcoActionCardProps {
  ecoAction: EcoActionType;
  isPartner?: boolean;
}

function EcoActionCard({ ecoAction, isPartner = false }: EcoActionCardProps) {
  const [deleteEcoAction] = useDeleteEcoActionMutation({
    refetchQueries: [GetUserEcoActionsDocument, "GetUserEcoActions"],
  });

  const handleRemoveEcoAction = async (ecoActionId: number) => {
    try {
      await deleteEcoAction({
        variables: {
          ecoActionId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly bg-card rounded-xl h-[135px] w-full lg:w-[33%] py-2 px-3">
      {isPartner && (
        <Button
          variant="destructive"
          size="icon"
          className="p-1 w-6 h-6 self-end"
          onClick={() => handleRemoveEcoAction(ecoAction.id)}
        >
          <X />
        </Button>
      )}

      <div className="text-center">
        <h4 className="font-semibold">{ecoAction.name}</h4>
        <p className="text-2xs">{ecoAction.description.slice(0, 150)}...</p>
      </div>
      <EcoActionDetailsCard
        ecoAction={ecoAction}
        trigger={
          <Button variant="link" size="sm">
            Découvrir
          </Button>
        }
      />
    </div>
  );
}

export default EcoActionCard;
