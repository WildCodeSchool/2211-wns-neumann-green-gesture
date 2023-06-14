import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import {
  useCreateUserMutation,
  UsersDocument,
} from "../../gql/generated/schema";
import { Radio } from "@/components/RadioButtons";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { Form } from "@/components/ui/form";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string | undefined;
};

export type Formula = "free" | "partner";

const DEFAULT_USER = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: undefined,
};

const DEFAULT_FORMULA_RADIOS: Radio[] = [
  {
    id: "free",
    label: "Gratuit",
    type: "primary",
    value: "free",
  },
  {
    id: "partner",
    label: "Partenaire",
    type: "secondary",
    value: "partner",
    hint: "4,99€/mois",
  },
];

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(6).email({ message: "Email invalide" }),
  password: z.string().min(8).max(50),
  company: z.string().max(50).optional(),
});

function Register() {
  const [createUser, { loading: processing }] = useCreateUserMutation();
  const [step, setStep] = useState<number>(1);
  const [selectedFormula, setSelectedFormula] = useState<Formula>("free");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_USER,
    shouldFocusError: true,
  });

  const handleGoBackInStep = () => {
    setStep((prevStep) => (prevStep === 1 ? 1 : prevStep - 1));
  };

  const handleChangeFormula = (value: Formula) => {
    setSelectedFormula(value);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2 && selectedFormula === "partner") {
      setStep(3);
      return;
    }

    if (step > 1) {
      try {
        await createUser({
          variables: {
            data: {
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              company: values.company,
              subscriptionType: selectedFormula,
            },
          },
          refetchQueries: [{ query: UsersDocument }],
        });
        form.clearErrors();
        navigate("/");
      } catch (err) {
        console.error("err", err);
        form.setError("email", {
          type: "string",
          message: "email déjà utilisé",
        });
        setStep(1);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={1}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="py-8 h-full"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col items-center h-full justify-center"
          >
            {step === 1 && <StepOne control={form.control} />}
            {step === 2 && (
              <StepTwo
                radios={DEFAULT_FORMULA_RADIOS}
                handleChangeFormula={handleChangeFormula}
                handleGoBackInStep={handleGoBackInStep}
              />
            )}
            {step === 3 && (
              <StepThree
                control={form.control}
                handleGoBackInStep={handleGoBackInStep}
              />
            )}
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
}

export default Register;
