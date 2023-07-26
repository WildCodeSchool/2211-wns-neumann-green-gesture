import { Button } from "@/components/ui/button";

interface ValidationProps {
  setHide: (arg0: boolean) => void;
}

const Validation = ({ setHide }: ValidationProps) => {
  return (
    <div>
      <h1>Validation</h1>
      <Button
        className=""
        variant={"outline"}
        onClick={() => {
          setHide(false);
        }}
      >
        Annuler
      </Button>
      <Button
        className="bg-accent-blue hover:bg-[#0061c7]"
        onClick={() => {
          setHide(false);
        }}
      >
        VALIDER MON DÉFI
      </Button>
    </div>
  );
};

export default Validation;
