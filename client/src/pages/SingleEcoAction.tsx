import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SingleEcoAction = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="flex justify-start">
        <Button onClick={() => navigate("/group/")}>
          <ArrowLeft />
        </Button>
      </div>
    </div>
  );
};

export default SingleEcoAction;
