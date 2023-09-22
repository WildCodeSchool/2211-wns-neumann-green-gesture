import { Control } from "react-hook-form";
import { motion } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import EarthMoneyImg from "../../assets/images/register.png";
import CustomFormField from "../../components/CustomFormField";
import StepBackButton from "../../components/StepBackButton";
import { useEffect, useState } from "react";
import PaymentForm from "../../components/PaymentForm";

type StepThreeProps = {
  control: Control<
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      company?: string | undefined;
    },
    any
  >;
  email: string;
  firstName: string;
  lastName: string;
  handleGoBackInStep: () => void;
  triggerSubmit: () => void;
};

export const StepThree = ({
  control,
  handleGoBackInStep,
  email,
  firstName,
  lastName,
  triggerSubmit,
}: StepThreeProps) => {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:4002/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    }).then(async (res) => {
      const { clientSecret, subscriptionId } = await res.json();
      setClientSecret(clientSecret);
      control._formValues.subscriptionId = subscriptionId;
    });
  }, []);
  const stripePromise = loadStripe(
    process.env.VITE_PUBLIC_STRIPE_KEY as string
  );

  return (
    <motion.div
      key={3}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col items-center w-full px-5 pt-8 pb-10"
    >
      <StepBackButton onClick={handleGoBackInStep} />
      <img src={EarthMoneyImg} className="w-40" />
      <h2 className="text-xl font-bold mb-7">Plus qu'une étape !</h2>
      <CustomFormField
        control={control}
        label="Nom de l'entreprise"
        name="company"
        placeholder="Green Gesture"
      />
      <div className="w-full mt-8">
        <p className="text-sm font-semibold mb-2">Moyen de paiement</p>
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <PaymentForm
              triggerSubmit={triggerSubmit}
              isFormValid={control._formValues.company?.length >= 2}
            />
          </Elements>
        )}
      </div>
    </motion.div>
  );
};
