export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string | undefined;
};

export type Formula = "free" | "partner";
