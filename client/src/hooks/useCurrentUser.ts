import { useGetCurrentUserQuery } from "@/gql/generated/schema";

export const useCurrentUser = () => {
  const { data: currentUserData, loading } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.getCurrentUser;

  return { currentUser, loading };
};
