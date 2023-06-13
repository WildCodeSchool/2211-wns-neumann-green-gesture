import Layout from "../containers/Layout";
import { Link } from "react-router-dom";

import { useGetUserGroupsQuery } from "../gql/generated/schema";

function Home() {
  const { data, refetch } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];
  refetch();

  return <p>Home</p>;
}

export default Home;
