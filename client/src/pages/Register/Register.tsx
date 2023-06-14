import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCreateUserMutation,
  UsersDocument,
} from "../../gql/generated/schema";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { Radio } from "@/components/RadioButtons";
import { StepThree } from "./StepThree";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
};

export type Formula = "free" | "partner";

const DEFAULT_USER = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
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

function Register() {
  const [createUser, { loading: processing }] = useCreateUserMutation();
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [step, setStep] = useState<number>(3);
  const [selectedFormula, setSelectedFormula] = useState<Formula>("free");

  const navigate = useNavigate();

  const handleChangeStep = (step: number) => {
    if (step === 1 && isFirstStepValid()) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
  };

  const isFirstStepValid = () => {
    return (
      user.firstName.length > 3 &&
      user.lastName.length > 3 &&
      user.email.length >= 8 &&
      user.password.length >= 8
    );
  };

  const handleChangeFormula = (value: Formula) => {
    setSelectedFormula(value);
  };

  const handleSubmit = async () => {
    try {
      await createUser({
        variables: {
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
          },
        },
        refetchQueries: [{ query: UsersDocument }],
      });
      navigate("/");
    } catch (err) {
      console.error("err", err);
    } finally {
      setUser(DEFAULT_USER);
    }
  };

  const handleUpdateUser = (key: keyof User, value: string) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <div className="flex flex-col items-center h-full justify-center">
      {step === 1 && (
        <StepOne
          user={user}
          handleUpdateUser={handleUpdateUser}
          handleChangeStep={handleChangeStep}
        />
      )}
      {step === 2 && (
        <StepTwo
          radios={DEFAULT_FORMULA_RADIOS}
          formula={selectedFormula}
          handleChangeFormula={handleChangeFormula}
          handleSubmit={handleSubmit}
          handleChangeStep={handleChangeStep}
        />
      )}
      {step === 3 && (
        <StepThree
          user={user}
          handleUpdateUser={handleUpdateUser}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Register;
