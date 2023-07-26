import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThumbsUp } from "lucide-react";

interface EcoActionDetailsCardProps {
  name: string;
  likes: number;
  description: string;
}

const EcoActionDetailsCard = ({
  name,
  likes,
  description,
}: EcoActionDetailsCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="text-xs">Voir plus</DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <DialogHeader>
          <DialogTitle className=" text-center">{name}</DialogTitle>
        </DialogHeader>
        <div className=" bg-grey-green rounded-xl p-3">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-md font-semibold my-1">
              Description de l'éco-geste
            </h5>
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-full bg-primary flex justify-center items-center p-1">
                <ThumbsUp className="text-grey-green" size={"15px"} />
              </div>
              <p className="text-xs">{likes}</p>
            </div>
          </div>

          <p className="text-xs">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoActionDetailsCard;
