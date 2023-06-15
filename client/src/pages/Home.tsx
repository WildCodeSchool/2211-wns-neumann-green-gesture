import Layout from "../containers/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useGetFreeEcoActionsQuery,
  useGetUserGroupsQuery,
} from "../gql/generated/schema";
import { Button } from "@/components/ui/button";

function Home() {
  const { data, refetch } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];
  const { data: dataFreeEcoActions } = useGetFreeEcoActionsQuery();
  const freeEcoActions = dataFreeEcoActions?.getFreeEcoActions || [];
  const navigate = useNavigate();
  refetch();

  const items = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/500?idx=${i}`,
  }));

  return (
    <div className="flex flex-col m-5">
      {groups.length > 1 ? (
        <>
          <h3 className="font-semibold mb-3">Mes challenges en cours</h3>
          <div className="flex overflow-scroll snap-mandatory gap-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[125px] cursor-pointer p-2"
              >
                <Link to={`/group/${group.id}`}>
                  <div>
                    <h4 className="text-2xs font-semibold">
                      {group.challengeName}
                    </h4>
                    <p className="text-2xs">
                      Fini dans{" "}
                      <span className="font-semibold">{group.endDate}</span>
                    </p>
                  </div>
                  <div className="flex flex-row-reverse">
                    <p className="text-2xs font-semibold">15/45 points</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
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

      <div className="mt-8">
        <h3 className="font-semibold mb-3">Derniers éco-gestes disponibles</h3>

        <div className="flex overflow-scroll snap-mandatory gap-3 w-full">
          {freeEcoActions?.map((ecoAction) => (
            <div
              key={ecoAction.id}
              className="flex flex-col items-center bg-card rounded-xl h-[125px] min-w-full cursor-pointer p-2"
            >
              <Link to={`/eco-action/${ecoAction.id}`}>
                <div>
                  <h4 className="text-center text-2xs font-semibold mb-3">
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

      <div className="mt-8">
        <h3 className="font-semibold">Éco-gestes les plus populaires</h3>
        {/* {freeEcoActions?.map((ecoAction) => (
          <p>{ecoAction.name}</p>
        ))} */}
        <div className="bg-card rounded-lg h-32 mt-3"></div>
      </div>
    </div>
  );
}

export default Home;
