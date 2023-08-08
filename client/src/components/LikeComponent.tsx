import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useIsLikedQuery,
} from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";
import { Heart } from "lucide-react";

interface LikeComponentProps {
  ecoActionId: number;
}

const LikeComponent = ({ ecoActionId }: LikeComponentProps) => {
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
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };
  if (loading) return <Loading />;

  return (
    <>
      {isLiked ? (
        <Heart
          className="text-[#FF0101] w-4 cursor-pointer"
          onClick={() => handleDeleteLike()}
        />
      ) : (
        <Heart className="w-4 cursor-pointer" onClick={() => handleLike()} />
      )}
    </>
  );
};

export default LikeComponent;
