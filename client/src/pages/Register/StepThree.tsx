import { Control } from "react-hook-form";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import RadioButtons, { Radio } from "@/components/RadioButtons";
import CustomFormField from "@/components/CustomFormField";
import StepBackButton from "@/components/StepBackButton";
import { User } from "@/types/global";

type StepThreeProps = {
  control: Control<User, any>;
  handleGoBackInStep: () => void;
};

const PAYMENT_METHODS_RADIOS: Radio[] = [
  {
    id: "paypal",
    label: "Paypal",
    type: "primary",
    value: "paypal",
  },
  {
    id: "credit-card",
    label: "Carte de crédit",
    type: "primary",
    value: "credit-card",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    type: "primary",
    value: "apple-pay",
  },
];

export const StepThree = ({ control, handleGoBackInStep }: StepThreeProps) => {
  return (
    <motion.div
      key={3}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col items-center w-full px-5"
    >
      <StepBackButton onClick={handleGoBackInStep} />
      <img src="./src/assets/images/earth-money.png" className="w-40" />
      <h2 className="text-xl font-bold mb-7">Plus qu'une étape !</h2>
      <CustomFormField
        control={control}
        label="Nom de l'entreprise"
        name="company"
        placeholder="Green Gesture"
      />
      <div className="w-full mt-8">
        <p className="text-sm font-semibold mb-2">Moyen de paiement</p>
        <RadioButtons
          radios={PAYMENT_METHODS_RADIOS}
          onChange={() => null}
          defaultValue="paypal"
        />
      </div>
      <Button type="submit" className="w-full mt-8">
        Je procède au paiement
      </Button>
    </motion.div>
  );
};
