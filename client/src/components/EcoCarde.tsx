import { useGetUserEcoActionQuery } from "@/gql/generated/schema";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface EcoCardeProps {
  name: string;
  description: string;
  ecoActionId: number;
  groupId: number;
}

const EcoCarde = ({
  name,
  description,
  ecoActionId,
  groupId,
}: EcoCardeProps) => {
  const { data, loading } = useGetUserEcoActionQuery({
    variables: { ecoActionId: ecoActionId, groupId: groupId },
  });

  const ecoAction = data?.getUserEcoAction;

  const [Liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!Liked);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AnimatePresence>
      <motion.div
        key={ecoActionId}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
        exit={{ x: 300, opacity: 0 }}
        className="h-full"
      >
        <div className="w-[100%] rounded-xl bg-grey-green my-5 px-3 pb-4 pt-2 hover:shadow-2xl transition ease-in-out delay-90">
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-sans text-xs">{name}</h3>
            {Liked ? (
              <Heart
                className="text-[#FF0101] w-4"
                onClick={() => handleLike()}
              />
            ) : (
              <Heart className="w-4" onClick={() => handleLike()} />
            )}
          </div>
          <p className="font-sans text-2xs">{description}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EcoCarde;
