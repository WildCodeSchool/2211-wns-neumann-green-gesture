import DisplayDate from "@/components/DisplayDate";
import { useGetUserGroupsQuery } from "@/gql/generated/schema";
import { Link } from "react-router-dom";

function Groups() {
  const { data: userGroups } = useGetUserGroupsQuery();
  const groups = userGroups?.getUserGroups || [];

  // challenge en cours
  const challengeInProgress = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now >= startDate && now <= endDate;
  });

  // challenge à venir
  const challengeToCome = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    return now < startDate;
  });

  // challenge terminé
  const challengeFinished = groups.filter((chall) => {
    const now = new Date().getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now > endDate;
  });

  return (
    <div className="space-y-8">
      {/* CHALLENGES EN COURS */}
      <div>
        <h2 className="font-semibold mb-3">Mes challenges en cours</h2>
        <div className="flex overflow-scroll snap-mandatory gap-3">
          {challengeInProgress.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box border-2 border-transparent hover:border-primary"
            >
              <div>
                <h4 className="text-xs font-semibold">{group.challengeName}</h4>
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

      {/* CHALLENGES À VENIR */}
      <div>
        <h2 className="font-semibold mb-3">Mes challenges à venir</h2>
        <div className="flex overflow-scroll snap-mandatory gap-3">
          {challengeToCome.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box border-2 border-transparent hover:border-primary"
            >
              <div>
                <h4 className="text-xs font-semibold">{group.challengeName}</h4>
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

      {/* CHALLENGES TERMINÉS */}
      <div>
        <h2 className="font-semibold mb-3">Mes challenges terminés</h2>
        <div className="flex overflow-scroll snap-mandatory gap-3">
          {challengeFinished.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box border-2 border-transparent hover:border-primary"
            >
              <div>
                <h4 className="text-xs font-semibold">{group.challengeName}</h4>
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
    </div>
  );
}

export default Groups;
