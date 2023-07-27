import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
