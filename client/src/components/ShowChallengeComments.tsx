import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { User } from "@/types/global";

interface ShowChallengeCommentsProps {
  component: React.ReactNode;
  comments: {
    __typename?: "Comment" | undefined;
    id: number;
    createdAt: any;
    message: string;
    author: Partial<User>;
  }[];
}

function ShowChallengeComments({
  component,
  comments,
}: ShowChallengeCommentsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div className="w-full md:w-auto cursor-pointer">{component}</div>
      </SheetTrigger>
      <SheetContent position="bottom" size="eco-geste">
        <div className="md:container">
          <SheetHeader>
            <div>
              <SheetTitle className="text-xl">Commentaires</SheetTitle>
            </div>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {comments.length === 0 && <p>Aucun commentaires...</p>}
            {comments.length > 0 &&
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="space-y-3 bg-grey-green p-2 rounded-xl"
                >
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center font-bold p-2 w-8 text-xs rounded-full bg-light-green text-primary">
                      {comment.author?.firstName?.split("")[0]}
                    </span>
                    <h5 className="text-xs font-semibold">
                      {comment.author?.firstName} {comment.author?.lastName}
                    </h5>
                  </div>
                  <p className="text-normal">{comment.message}</p>
                </div>
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ShowChallengeComments;
