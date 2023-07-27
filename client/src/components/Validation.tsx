import { useState } from "react";

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
import { PointType } from "@/types/global";

interface ValidationProps {
  userEcoActionId: number;
}

const Validation = ({ userEcoActionId }: ValidationProps) => {
  const [selectedPoint, setSelecedPoint] = useState<PointType>("0");

  const handleChange = (value: PointType) => {
    setSelecedPoint(value);
    console.log(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("submit", selectedPoint);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-accent-blue hover:text-[#0061c7]">
        VALIDER MON DÉFI
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <DialogHeader>
          <DialogTitle className=" text-center">Je note mon défi</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <RadioGroup
            defaultValue="0"
            className="flex flex-row justify-center h-11 mb-5"
            onValueChange={(value) => handleChange(value as PointType)}
          >
            <div className="flex flex-col-reverse justify-between items-center space-x-2">
              <RadioGroupItem value="0" id="r1" />
              <Label htmlFor="r1">0 pts</Label>
            </div>
            <div className="flex flex-col-reverse justify-between items-center space-x-2">
              <RadioGroupItem value="3" id="r2" />
              <Label htmlFor="r2">3 pts</Label>
            </div>
            <div className="flex flex-col-reverse justify-between items-center space-x-2">
              <RadioGroupItem value="6" id="r3" />
              <Label htmlFor="r3">6 pts</Label>
            </div>
            <div className="flex flex-col-reverse justify-between items-center space-x-2">
              <RadioGroupItem value="9" id="r4" />
              <Label htmlFor="r4">9 pts</Label>
            </div>
          </RadioGroup>
          <h2 className=" text-center">J'ajoute une preuve</h2>
          <div className=" h-[100px] w-[90%] bg-slate-300 rounded-xl my-5 mx-auto"></div>
          <DialogFooter className="flex flex-row justify-between sm:justify-evenly items-center">
            <DialogClose className="w-[160px] bg-transparent border border-input hover:bg-accent hover:text-accent-foreground rounded-3xl h-10 py-2">
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
