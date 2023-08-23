import CustomSelectMultiple from "@/components/CustomSelectMultiple";
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
import {
  GetUserEcoActionsDocument,
  useCreateEcoActionMutation,
} from "@/gql/generated/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const CreateEcoAction = () => {
  const navigate = useNavigate();
  const [createEcoAction] = useCreateEcoActionMutation({
    refetchQueries: [GetUserEcoActionsDocument, "GetUserEcoActions"],
  });

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
      .min(4, "Vous devez selectionner au minimum 4 validation")
      .max(4, "Vous ne pouvez pas selectionner plus de 4 validation"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      validationIds: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createEcoAction({
        variables: {
          data: {
            name: values.name,
            description: values.description,
            validationIds: values.validationIds,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
      navigate("/eco-actions");
    }
  };

  return (
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
                <CustomSelectMultiple field={field} />
              </FormControl>
              <FormDescription>
                Selectionne les points à gagner pour cette éco-action.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Créer
        </Button>
      </form>
    </Form>
  );
};

export default CreateEcoAction;
