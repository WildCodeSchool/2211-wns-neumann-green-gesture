import InputWithLabel from "@/components/InputWithLabel";
import { User } from "./Register";
import { Button } from "@/components/ui/button";
import RadioButtons, { Radio } from "@/components/RadioButtons";

type StepThreeProps = {
  user: User;
  handleUpdateUser: (key: keyof User, value: string) => void;
  handleSubmit: () => void;
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

export const StepThree = ({
  user,
  handleUpdateUser,
  handleSubmit,
}: StepThreeProps) => {
  const handleOnClick = () => {
    if (user.company.length > 3) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-5">
      <img src="./src/assets/images/earth-money.png" className="w-[200px]" />
      <h2 className="text-xl font-bold mb-7">Plus qu'une étape !</h2>
      <InputWithLabel
        idForLabel="company"
        label="Nom de l'entreprise"
        placeholder="Green Gesture"
        onChange={(e) => handleUpdateUser("company", e.target.value)}
        value={user.company}
      />
      <div className="w-full mt-4">
        <p className="text-sm font-semibold mb-2">Moyen de paiement</p>
        <RadioButtons
          radios={PAYMENT_METHODS_RADIOS}
          onChange={() => null}
          defaultValue="paypal"
        />
      </div>
      <Button className="w-full mt-7" onClick={handleOnClick}>
        Je procède au paiement
      </Button>
    </div>
  );
};
