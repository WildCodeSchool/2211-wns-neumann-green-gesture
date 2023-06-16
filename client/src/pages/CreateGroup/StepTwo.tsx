import { Control } from "react-hook-form";
import { Eye } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { FormControl, FormField } from "../../components/ui/form";
import { GroupeCreationType } from "../../types/global";
import {
  useGetFreeEcoActionsQuery,
  useGetPopularFreeEcoActionsQuery,
  useGetUserEcoActionsQuery,
} from "../../gql/generated/schema";

type StepTwoProps = {
  control: Control<GroupeCreationType, any>;
  handleGoBackInStep: () => void;
};

function StepTwo({ control, handleGoBackInStep }: StepTwoProps) {
  const { data: popularEcoActions, loading: loadingPopularEcoActions } =
    useGetPopularFreeEcoActionsQuery();
  const popularEcoActionsList =
    popularEcoActions?.getPopularFreeEcoActions || [];

  const { data: freeEcoActions, loading: loadingFreeEcoActions } =
    useGetFreeEcoActionsQuery();
  const freeEcoActionsList = freeEcoActions?.getFreeEcoActions || [];

  const { data: userEcoActions, loading: loadingUserEcoActions } =
    useGetUserEcoActionsQuery();
  const userEcoActionsList = userEcoActions?.getUserEcoActions || [];

  const ecoActionsList = [...freeEcoActionsList, ...userEcoActionsList];

  return (
    <div>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 2</h1>
        <p className="font-medium">Sélection des Éco-gestes</p>
      </div>

      <FormField
        control={control}
        name="ecoActionsIds"
        render={({ field }) => (
          <div className="space-y-6 w-full mt-7">
            <div className="space-y-2">
              <p className="font-semibold text-base">
                Les Éco-gestes populaires
              </p>
              <div className="flex space-x-4 items-center overflow-y-hidden overflow-x-scroll snap-mandatory">
                {popularEcoActionsList.map((ecoAction) => (
                  <div
                    key={ecoAction.id}
                    className="flex items-center justify-between space-x-4 py-1 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
                  >
                    <span>{ecoAction.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        className="p-1 h-auto"
                      >
                        <Eye size="24" />
                      </Button>
                      <FormControl>
                        <Checkbox
                          className="h-6 w-6 rounded-xl border-2"
                          checked={field.value?.includes(ecoAction.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, ecoAction.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== ecoAction.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-base">
                Mes Éco-gestes disponibles
              </p>
              <div className="flex gap-4 flex-wrap">
                {ecoActionsList.map((ecoAction) => (
                  <div
                    key={ecoAction.id}
                    className="flex items-center justify-between space-x-4 py-1 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
                  >
                    <span>{ecoAction.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        className="p-1 h-auto"
                      >
                        <Eye size="24" />
                      </Button>
                      <FormControl>
                        <Checkbox
                          className="h-6 w-6 rounded-xl border-2"
                          checked={field.value?.includes(ecoAction.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, ecoAction.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== ecoAction.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      />

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
          Suivant
        </Button>
      </div>
    </div>
  );
}

export default StepTwo;
