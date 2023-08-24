import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomSelectMultiple from "@/components/CustomSelectMultiple";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EcoActionUpdateType } from "@/types/global";

type ValidationType = {
  id: number;
  points: number;
};

type EcoActionType = {
  name?: string;
  description?: string;
  validations?: ValidationType[];
};

interface EcoActionFormProps {
  ecoAction?: EcoActionType;
  handledata: (values: EcoActionUpdateType) => Promise<void>;
  mode?: "create" | "update";
}

const EcoActionForm = ({
  ecoAction,
  handledata,
  mode = "create",
}: EcoActionFormProps) => {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Le nom doit faire plus de 3 caractères")
      .max(150, "Le nom doit faire moins de 150 caractères"),
    description: z
      .string()
      .min(2, "La description doit faire plus de 2 caractères"),
    validationIds: z
      .array(z.number())
      .min(4, "Vous devez sélectionner au minimum 4 validations")
      .max(4, "Vous ne pouvez pas sélectionner plus de 4 validations"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ecoAction?.name || "",
      description: ecoAction?.description || "",
      validationIds: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handledata(values);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nettoyer la plage - Un éco-geste pour sauver nos océans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Ma super description..." {...field} />
                </FormControl>
                <FormDescription>
                  Explique le but de ton éco-action et comment les utilisateurs
                  peuvent y participer.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validationIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <CustomSelectMultiple
                    field={field}
                    validations={ecoAction?.validations}
                  />
                </FormControl>
                <FormDescription>
                  Sélectionne les différents points à gagner pour cette
                  éco-action.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {mode === "create" ? "Créer" : "Modifier"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EcoActionForm;
