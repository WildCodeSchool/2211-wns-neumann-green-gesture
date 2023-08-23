import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useGetFreeEcoActionsQuery,
  useGetUserGroupsQuery,
} from "../gql/generated/schema";
import { Button } from "@/components/ui/button";
import DisplayDate from "@/components/DisplayDate";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import EcoActionDetailsCard from "@/components/EcoActionDetailsCard";

function Home() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const { data: userGroups, refetch } = useGetUserGroupsQuery();
  const groups = userGroups?.getUserGroups || [];

  const { data: dataFreeEcoActions } = useGetFreeEcoActionsQuery();
  const freeEcoActions = dataFreeEcoActions?.getFreeEcoActions || [];

  useEffect(() => {
    refetch();
  }, []);

  const challengeInProgress = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now >= startDate && now <= endDate;
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Bienvenue, {currentUser?.firstName} {currentUser?.lastName} ! 👋
      </h1>
      <div className="space-y-8">
        {groups.length > 0 ? (
          <div>
            <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
              <h2 className="font-semibold">Mes challenges en cours</h2>
              <Link to="/groups" className="text-xs underline">
                Voir tous
              </Link>
            </div>
            <div className="flex overflow-scroll snap-mandatory gap-3">
              {challengeInProgress.map((group) => (
                <Link
                  key={group.id}
                  to={`/groups/${group.id}`}
                  className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box border-2 border-transparent hover:border-primary"
                >
                  <div>
                    <h4 className="text-xs font-semibold">
                      {group.challengeName}
                    </h4>
                    <DisplayDate
                      startDate={group.startDate}
                      endDate={group.endDate}
                      size="2xs"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse flex-end bg-card rounded-lg p-3 h-32">
            <Button
              variant="secondary"
              onClick={() => navigate("/create-group")}
              data-testid="no-challenge"
            >
              Créer mon premier challenge
            </Button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
            <h2 className="font-semibold">Nouveaux éco-gestes</h2>
            <Link to="/eco-actions" className="text-xs underline">
              Voir tous
            </Link>
          </div>

          <div className="flex overflow-scroll snap-mandatory gap-3 w-full">
            {freeEcoActions?.map((ecoAction) => (
              <div
                key={ecoAction.id}
                className="flex flex-col items-center justify-evenly bg-card rounded-xl h-[135px] w-full lg:w-[33%] py-2 px-3"
              >
                <div className="text-center">
                  <h4 className="font-semibold">{ecoAction.name}</h4>
                  <p className="text-2xs">
                    {ecoAction.description.slice(0, 150)}...
                  </p>
                </div>
                <EcoActionDetailsCard
                  ecoAction={ecoAction}
                  trigger={
                    <Button variant="link" size="sm">
                      Découvrir
                    </Button>
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
            <h2 className="font-semibold">Éco-gestes populaires</h2>
            <Link to="/eco-actions" className="text-xs underline">
              Voir tous
            </Link>
          </div>
          <div className="flex overflow-scroll snap-mandatory gap-3 w-full">
            {freeEcoActions?.map((ecoAction) => (
              <div
                key={ecoAction.id}
                className="flex flex-col items-center bg-card rounded-xl h-[125px] w-full lg:w-[33%] py-2 px-3"
              >
                <div className="text-center">
                  <h4 className="font-semibold">{ecoAction.name}</h4>
                  <p className="text-2xs">
                    {ecoAction.description.slice(0, 150)}...
                  </p>
                </div>
                <EcoActionDetailsCard
                  ecoAction={ecoAction}
                  trigger={
                    <Button variant="link" size="sm">
                      Découvrir
                    </Button>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
