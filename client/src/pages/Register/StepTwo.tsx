import { motion } from "framer-motion";
import RadioButtons, { Radio } from "../../components/RadioButtons";
import { Button } from "../../components/ui/button";
import StepBackButton from "../../components/StepBackButton";
import { Formula } from "@/types/global";

type StepTwoProps = {
  radios: Radio[];
  handleChangeFormula: (value: Formula) => void;
  handleGoBackInStep: () => void;
};

export const StepTwo = ({
  radios,
  handleChangeFormula,
  handleGoBackInStep,
}: StepTwoProps) => {
  return (
    <motion.div
      key={2}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ x: -300, opacity: 0 }}
      className="relative flex flex-col items-center px-5"
    >
      <StepBackButton onClick={handleGoBackInStep} />
      <img src="./src/assets/images/globe-formula.png" className="w-48" />
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
      <Button type="submit" className="w-full mt-7">
        Je finalise mon inscription
      </Button>
    </motion.div>
  );
};
