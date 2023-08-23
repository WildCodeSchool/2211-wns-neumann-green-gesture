import {
  useGetFreeEcoActionsQuery,
  useGetUserEcoActionsQuery,
} from "@/gql/generated/schema";

function EcoActions() {
  const { data: freeEcoActions, loading: loadingFreeEcoActions } =
    useGetFreeEcoActionsQuery();
  const freeEcoActionsList = freeEcoActions?.getFreeEcoActions || [];

  const { data: userEcoActions, loading: loadingUserEcoActions } =
    useGetUserEcoActionsQuery();
  const userEcoActionsList = userEcoActions?.getUserEcoActions || [];

  console.log({ freeEcoActionsList, userEcoActionsList });

  return <div>EcoActions</div>;
}

export default EcoActions;
