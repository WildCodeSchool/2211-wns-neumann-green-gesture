import InputWithLabel from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { User } from "./Register";

type StepOneProps = {
  user: User;
  handleUpdateUser: (key: keyof User, value: string) => void;
  handleChangeStep: (step: number) => void;
};

export const StepOne = ({
  user,
  handleUpdateUser,
  handleChangeStep,
}: StepOneProps) => {
  return (
    <>
      <img src="./src/assets/images/register.png" className="w-[260px]" />
      <h1 className="text-2xl font-bold my-3">S'inscrire</h1>
      <div className="space-y-6 w-full px-8">
        <InputWithLabel
          idForLabel="firstName"
          label="Votre prénom"
          placeholder="Tom"
          onChange={(e) => handleUpdateUser("firstName", e.target.value)}
          value={user.firstName}
        />
        <InputWithLabel
          idForLabel="lastName"
          label="Votre nom"
          placeholder="Saywer"
          onChange={(e) => handleUpdateUser("lastName", e.target.value)}
          value={user.lastName}
        />
        <InputWithLabel
          idForLabel="email"
          label="Votre adresse mail"
          placeholder="tom.sawyer@gmail.com"
          type="email"
          onChange={(e) => handleUpdateUser("email", e.target.value)}
          value={user.email}
        />
        <InputWithLabel
          idForLabel="password"
          label="Votre mot de passe"
          placeholder="min. 8 caractères"
          type="password"
          onChange={(e) => handleUpdateUser("password", e.target.value)}
          value={user.password}
        />
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleChangeStep(1)}
        >
          Je m'inscris
        </Button>
      </div>
      <p className="text-xs">
        Déjà inscrit ?
        <Button className="text-xs p-1" type="button" variant="link">
          Se connecter
        </Button>
      </p>
    </>
  );
};
