interface EcoActionDetailsProps {
  ecoAction: {
    id: number;
    name: string;
    likes: number;
    description: string;
  };
}

function EcoActionDetails({ ecoAction }: EcoActionDetailsProps) {
  return (
    <div className="mt-7">
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Description du challenge</h4>
        <div className="elevate-box rounded-xl bg-card-alt text-card-alt-foreground">
          <p className="text-sm">{ecoAction.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EcoActionDetails;
