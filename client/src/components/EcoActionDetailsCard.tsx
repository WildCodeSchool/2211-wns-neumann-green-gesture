import { useState } from "react";

import { ThumbsUp } from "lucide-react";

interface EcoActionDetailsCardProps {
  name: string;
  likes: number;
  description: string;
}

const EcoActionDetailsCard = ({
  name,
  likes,
  description,
}: EcoActionDetailsCardProps) => {
  const [limite, setLimite] = useState(300);

  const hideButton = description.length < limite;
  const afficherPlus = description.length > limite;

  return (
    <div className=" bg-grey-green rounded-xl p-3 mt-8 mb-7">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-primary font-bold">{name}</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-full bg-primary flex justify-center items-center p-1">
            <ThumbsUp className="text-grey-green" size={"15px"} />
          </div>
          <p className="text-xs">{likes}</p>
        </div>
      </div>
      <h5 className=" text-md font-semibold my-1">
        Description de l'éco-geste
      </h5>
      <p className="text-xs">
        {afficherPlus ? `${description.slice(0, limite)}...` : description}
      </p>
      {!hideButton && (
        <div className="flex justify-end">
          {afficherPlus && (
            <button onClick={() => setLimite(description.length)}>
              Voir plus
            </button>
          )}
          {!afficherPlus && (
            <button onClick={() => setLimite(300)}>Voir moins</button>
          )}
        </div>
      )}
    </div>
  );
};

export default EcoActionDetailsCard;
