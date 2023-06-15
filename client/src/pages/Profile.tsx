import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
} from "@/gql/generated/schema";

import Layout from "../containers/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Replace, Users2, Variable } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { data, loading, error } = useGetCurrentUserQuery();

  const currentUser = data?.getCurrentUser;

  if (loading) return <div>Loading ...</div>;

  return (
    <div>
      <div className="h-full">
        <div className="flex justify-around pt-5">
          <h1 className="font-sans text-2xl font-bold">
            Bienvenue, {currentUser?.firstName} {currentUser?.lastName}
          </h1>
          {currentUser?.subscriptionType === "partner" && (
            <Badge variant={"accent"} className={"text-sm font-medium"}>
              Partner
            </Badge>
          )}
        </div>
        <Button
          className={" w-[350px] my-4 mx-auto py-6 text-sm flex"}
          onClick={() => navigate("#", { replace: true })}
        >
          VOIR MES CHALLENGES <ArrowRight className="ms-3" />
        </Button>
        <div className="pt-5 ms-4">
          <h2 className="font-sans text-xl font-semibold">
            Mes informations personnelles
          </h2>
          <div>
            <div className=" mt-4">
              <h5 className="font-sans text-sm font-semibold">Nom</h5>
              <p className="mt-2 ms-4 text-xs">{currentUser?.lastName}</p>
            </div>
            <div className=" mt-4">
              <h5 className="font-sans text-sm font-semibold">Prénom</h5>
              <p className="mt-2 ms-4 text-xs">{currentUser?.firstName}</p>
            </div>
            <div className=" mt-4">
              <h5 className="font-sans text-sm font-semibold">Email</h5>
              <p className="mt-2 ms-4 text-xs">{currentUser?.email}</p>
            </div>
          </div>
          <div className="mt-14">
            <h2 className="font-sans text-xl font-semibold">Mon entreprise</h2>
            <div>
              <div className=" mt-4">
                <h5 className="font-sans text-sm font-semibold">
                  Nom de l'entreprise
                </h5>
                <p className="mt-2 ms-4 text-xs">
                  {currentUser?.company?.name ?? "Aucune entreprise"}
                </p>
              </div>
              <div className=" mt-4">
                <h5 className="font-sans text-sm font-semibold">
                  Nombre d'utilisateurs de l'entreprise
                </h5>
                <div className="flex justify-start">
                  <p className="mt-2 font-bold text-lg">
                    {currentUser?.company?.users?.length ?? 0} utilisateurs
                  </p>
                  <Button
                    variant={"link"}
                    onClick={() => navigate("#", { replace: true })}
                    className="text-xs"
                  >
                    voir les utilisateurs <Users2 className="ms-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
