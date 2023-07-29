import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ValidationDetailsProps {
  points: number;
  proof?: string | null;
}

const ValidationDetails = ({ points, proof }: ValidationDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="text-xs text-accent-blue hover:text-[#0061c7]">
        MA VALIDATION
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <div className="flex justify-end items-center">
          <DialogClose className="h-4 w-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">Ma note</DialogTitle>
        </DialogHeader>
        <p className="text-center text-md text-accent-blue font-semibold my-1">{`${points} points`}</p>
        {!proof ? (
          <h5 className="text-center text-md font-semibold my-1">
            Aucune preuve fournie
          </h5>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-center text-md font-semibold my-1">
              Ma preuve
            </h5>
            <img
              className="max-h-48 max-w-48"
              src={proof}
              alt="preuve de validation"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ValidationDetails;
