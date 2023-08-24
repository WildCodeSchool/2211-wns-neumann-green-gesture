import { EcoActionType } from "@/types/global";
import EcoActionDetailsCard from "./EcoActionDetailsCard";
import { Button } from "./ui/button";

interface EcoActionCardProps {
  ecoAction: EcoActionType;
}

function EcoActionCard({ ecoAction }: EcoActionCardProps) {
  return (
    <div className="flex flex-col items-center justify-evenly bg-card rounded-xl h-[115px] w-full lg:w-[32%] py-2 px-3">
      <div className="text-center">
        <h4 className="font-semibold text-sm">{ecoAction.name}</h4>
        <p className="text-2xs">{ecoAction.description.slice(0, 100)}...</p>
      </div>
      <EcoActionDetailsCard
        ecoAction={ecoAction}
        trigger={
          <Button variant="link" size="sm" className="text-xs">
            Découvrir
          </Button>
        }
      />
    </div>
  );
}

export default EcoActionCard;
