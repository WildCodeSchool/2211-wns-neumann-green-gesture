import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useGetFreeEcoActionsQuery,
  useGetUserGroupsQuery,
} from "../gql/generated/schema";
import { Button } from "@/components/ui/button";
import { challengeCountDown } from "@/lib/utils";
import DisplayDate from "@/components/DisplayDate";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function Home() {
  const { currentUser } = useCurrentUser();

  const { data: userGroups, refetch } = useGetUserGroupsQuery();
  const groups = userGroups?.getUserGroups || [];

  const { data: dataFreeEcoActions } = useGetFreeEcoActionsQuery();
  const freeEcoActions = dataFreeEcoActions?.getFreeEcoActions || [];
  const navigate = useNavigate();
  refetch();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Bienvenue, {currentUser?.firstName} {currentUser?.lastName} ! 👋
      </h1>
      <div className="space-y-8">
        {groups.length > 0 ? (
          <div>
            <h2 className="font-semibold mb-3">Mes challenges en cours</h2>
            <div className="flex overflow-scroll snap-mandatory gap-3">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  to={`/groups/${group.id}`}
                  className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box"
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
                  <div className="flex flex-row-reverse">
                    <p className="text-2xs font-semibold">1/3 points</p>
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
          <h3 className="font-semibold mb-3">
            Derniers éco-gestes disponibles
          </h3>

          <div className="flex overflow-scroll snap-mandatory gap-3 w-full">
            {freeEcoActions?.map((ecoAction) => (
              <div
                key={ecoAction.id}
                className="flex flex-col items-center bg-card rounded-xl h-[125px] min-w-full cursor-pointer p-2"
              >
                <Link to={`/eco-action/${ecoAction.id}`}>
                  <div>
                    <h4 className="text-center font-semibold mb-3">
                      {ecoAction.name}
                    </h4>
                    <p className="text-2xs text-center">
                      {ecoAction.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Éco-gestes les plus populaires</h3>
          <div className="flex overflow-scroll snap-mandatory gap-3 w-full">
            {freeEcoActions?.map((ecoAction) => (
              <div
                key={ecoAction.id}
                className="flex flex-col items-center bg-card rounded-xl h-[125px] min-w-full cursor-pointer p-2"
              >
                <Link to={`/eco-action/${ecoAction.id}`}>
                  <div>
                    <h4 className="text-center font-semibold mb-3">
                      {ecoAction.name}
                    </h4>
                    <p className="text-2xs text-center">
                      {ecoAction.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
