import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateTeamsMutation } from "@/gql/generated/schema";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { Input } from "@/components/ui/input";

type StepFourProps = {
  groupId: number | null;
  handleGoBackInStep: () => void;
};

type Team = {
  name: string;
  participants: number[];
};

const DEFAULT_TEAMS: Team[] = [
  {
    name: "",
    participants: [],
  },
];

const formSchema = z
  .object({
    name: z.string().min(3).max(150),
    participants: z.array(z.number()),
  })
  .array();

function StepFour({ groupId, handleGoBackInStep }: StepFourProps) {
  const [teams, setteams] = useState<Team[]>(DEFAULT_TEAMS);
  // Queries
  const [createTeams, { loading: processing }] = useCreateTeamsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_TEAMS,
    shouldFocusError: true,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };

  return (
    <>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 4</h1>
        <p className="font-medium">Création des équipes</p>
      </div>

      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4 mt-5">
              <p>Gestion de l'ajout des équipes ici</p>
              <p>Changer le process pour ajouter une équipe à la fois</p>
            </div>

            <div className="flex items-center gap-1 mt-10">
              <Button
                onClick={handleGoBackInStep}
                type="button"
                variant="outline"
                className="w-full"
              >
                Retour
              </Button>
              <Button type="submit" className="w-full">
                Créer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default StepFour;
