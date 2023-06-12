import Layout from "../containers/Layout";
import { Link } from "react-router-dom";

import { useGetUserGroupsQuery } from "../gql/generated/schema";
import { Button } from "@/components/ui/button";

function Home() {
  const { data, refetch } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];
  refetch();

  return (
    <>
      <h1 className="text-3xl">Home</h1>
      <Button variant="default">Test</Button>
      <Button variant="secondary">Test</Button>
    </>
  );
}

export default Home;
