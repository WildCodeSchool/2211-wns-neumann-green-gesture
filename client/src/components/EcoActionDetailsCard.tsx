import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loading } from "@/pages/Loading";
import { ThumbsUp } from "lucide-react";
import { X } from "lucide-react";

import { useGetNumberLikesQuery } from "@/gql/generated/schema";

interface EcoActionDetailsCardProps {
  name: string;
  ecoActionId: number;
  description: string;
}

const EcoActionDetailsCard = ({
  name,
  ecoActionId,
  description,
}: EcoActionDetailsCardProps) => {
  const { data, loading, refetch } = useGetNumberLikesQuery({
    variables: { ecoActionId },
  });
  const [likes, setLikes] = useState<number | undefined>(data?.getNumberLikes);

  useEffect(() => {
    setLikes(data?.getNumberLikes);
  }, [data?.getNumberLikes]);

  const handleClick = async () => {
    await refetch();
    setLikes(data?.getNumberLikes);
  };

  if (loading) return <Loading />;

  return (
    <Dialog>
      <DialogTrigger
        className="text-xs text-accent-blue hover:text-[#0061c7]"
        onClick={() => handleClick()}
      >
        VOIR PLUS
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <div className="flex justify-end items-center">
          <DialogClose className="h-4 w-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">{name}</DialogTitle>
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
