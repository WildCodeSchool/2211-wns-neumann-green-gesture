import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useIsLikedQuery,
} from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface LikeComponentProps {
  ecoActionId: number;
  handleRefreshLikeCount: (n: 0 | 1) => void;
}

const LikeComponent = ({
  ecoActionId,
  handleRefreshLikeCount,
}: LikeComponentProps) => {
  const {
    data: isLikedData,
    loading,
    refetch,
  } = useIsLikedQuery({
    variables: { ecoActionId },
  });
  const isLiked = isLikedData?.isLiked;

  const [CreateLike] = useCreateLikeMutation();
  const [DeleteLike] = useDeleteLikeMutation();

  const handleLike = async () => {
    try {
      await CreateLike({
        variables: {
          ecoActionId,
        },
      });
      handleRefreshLikeCount(1);
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  const handleDeleteLike = async () => {
    try {
      await DeleteLike({
        variables: {
          ecoActionId,
        },
      });
      handleRefreshLikeCount(0);
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Button
        size="icon"
        className={`p-1 h-6 w-6 hover:bg-red-500 hover:text-white cursor-pointer ${
          isLiked ? "bg-red-500 text-white" : ""
        }`}
        asChild={true}
        variant="ghost"
        onClick={() => {
          isLiked ? handleDeleteLike() : handleLike();
        }}
      >
        <Heart className="" />
      </Button>
    </>
  );
};

export default LikeComponent;
