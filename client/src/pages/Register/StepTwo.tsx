import RadioButtons, { Radio } from "@/components/RadioButtons";
import { Button } from "@/components/ui/button";
import { Formula } from "./Register";

type StepTwoProps = {
  radios: Radio[];
  formula: Formula;
  handleChangeFormula: (value: Formula) => void;
  handleSubmit: () => void;
  handleChangeStep: (step: number) => void;
};

export const StepTwo = ({
  radios,
  formula,
  handleChangeFormula,
  handleSubmit,
  handleChangeStep,
}: StepTwoProps) => {
  return (
    <div className="flex flex-col items-center mx-5">
      <img src="./src/assets/images/globe-formula.png" />
      <h2 className="text-xl font-bold my-8">Sélectionnez votre formule</h2>
      <RadioButtons
        radios={radios}
        onChange={(value) => handleChangeFormula(value as Formula)}
        defaultValue="free"
      />
      <p className="text-sm text-center mt-7">
        Enregistrez votre entreprise, et créez des challenges en formant des
        équipes avec vos collaborateurs !
      </p>
      <Button
        className="w-full mt-7"
        onClick={formula === "free" ? handleSubmit : () => handleChangeStep(2)}
      >
        Je finalise mon inscription
      </Button>
    </div>
  );
};
