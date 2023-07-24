import { ThumbsUp } from "lucide-react";
import EcoActionDetails from "./EcoActionDetails";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { EcoActionType } from "@/types/global";

interface SeeEcoActionProps {
  component: React.ReactNode;
  ecoAction: EcoActionType;
}

function SeeEcoActionDrawer({ component, ecoAction }: SeeEcoActionProps) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div>{component}</div>
      </SheetTrigger>
      <SheetContent position="bottom" size="eco-geste">
        <div className="md:container">
          <SheetHeader>
            <div className="flex flex-wrap items-center space-x-3">
              <SheetTitle className="text-xl">{ecoAction.name}</SheetTitle>
              <div className="flex items-center">
                <Button
                  onClick={() => console.log("like")}
                  className="rounded-full p-1 h-auto"
                  title="Likez cette éco-action"
                >
                  <ThumbsUp color="#e8eede" size={18} />
                </Button>
                <span className="mt-1 ms-1">{ecoAction.likes} likes</span>
              </div>
            </div>
          </SheetHeader>
          <EcoActionDetails ecoAction={ecoAction} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SeeEcoActionDrawer;
