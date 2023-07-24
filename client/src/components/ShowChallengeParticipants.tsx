import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { User } from "@/types/global";

interface ShowChallengeParticipantsProps {
  component: React.ReactNode;
  participants: Partial<User>[];
}

function ShowChallengeParticipants({
  component,
  participants,
}: ShowChallengeParticipantsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div className="w-full md:w-auto cursor-pointer">{component}</div>
      </SheetTrigger>
      <SheetContent position="bottom" size="eco-geste">
        <div className="md:container">
          <SheetHeader>
            <div>
              <SheetTitle className="text-xl">Participants</SheetTitle>
            </div>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between w-full md:w-auto space-x-2 py-2 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
              >
                <p>
                  {participant.firstName} {participant.lastName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ShowChallengeParticipants;
