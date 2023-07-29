export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string | undefined;
};

export type Formula = "free" | "partner";

export type GroupeCreationType = {
  name: string;
  challengeName: string;
  dates: { from: Date; to: Date };
  participants: number[];
  ecoActionsIds: number[];
};
