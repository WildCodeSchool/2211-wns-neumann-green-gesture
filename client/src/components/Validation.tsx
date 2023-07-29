import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import FilesUploader from "./FilesUploader";
import { X } from "lucide-react";
import {
  useAddPointsMutation,
  useGetValidationsByEcoActionQuery,
} from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";

interface ValidationProps {
  ecoActionId: number;
  userEcoActionId: number;
}

const Validation = ({ ecoActionId, userEcoActionId }: ValidationProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string>("0");

  const { data, loading } = useGetValidationsByEcoActionQuery({
    variables: { ecoActionId },
  });
  const validations = data?.getValidationsByEcoAction;

  const [addPoints] = useAddPointsMutation();

  useEffect(() => {
    if (validations && validations[0]) {
      setSelectedPoint(validations[0].id.toString());
    }
  }, [validations]);

  if (loading || validations === undefined) return <Loading />;

  const handleChange = (value: string) => {
    setSelectedPoint(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        confirm(`Voulez-vous valider votre défi avec ${selectedPoint} points ?`)
      )
        await addPoints({
          variables: {
            data: {
              userEcoActionId: userEcoActionId,
              points: parseInt(selectedPoint, 10),
            },
          },
        });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="text-xs text-accent-blue hover:text-[#0061c7]"
        onClick={() => setOpen(!open)}
      >
        VALIDER MON DÉFI
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <div className="flex justify-end items-center">
          <DialogClose onClick={() => setOpen(false)} className="h-4 w-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className=" text-center">Je note mon défi</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <RadioGroup
            defaultValue={validations[0].id.toString()}
            className="flex flex-row justify-center h-11 mb-5"
            onValueChange={(value) => handleChange(value as string)}
          >
            {validations?.map((validation) => (
              <div
                className="flex flex-col-reverse justify-between items-center space-x-2"
                key={validation.id}
              >
                <RadioGroupItem
                  value={validation.id.toString()}
                  id={validation.id.toString()}
                />
                <Label htmlFor={validation.id.toString()}>
                  {validation.points} pts
                </Label>
              </div>
            ))}
          </RadioGroup>
          <h2 className=" text-center">J'ajoute une preuve</h2>
          <div className=" h-[100px] w-[90%] mt- 2mb-5 mx-auto flex justify-center items-center">
            <FilesUploader userEcoActionId={userEcoActionId} />
          </div>
          <DialogFooter className="flex flex-row justify-between sm:justify-evenly items-center">
            <DialogClose
              className="w-[160px] bg-transparent border border-input hover:bg-accent hover:text-accent-foreground rounded-3xl h-10 py-2"
              onClick={() => setOpen(!open)}
            >
              ANNULER
            </DialogClose>
            <Button className="bg-accent-blue hover:bg-[#0061c7]" type="submit">
              VALIDER MON DÉFI
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Validation;
