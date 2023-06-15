import { useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import { useGetGroupQuery } from "../gql/generated/schema";
import { Loading } from "./Loading";

function SingleGroup() {
  const { id } = useParams();
  const { data, loading } = useGetGroupQuery({
    variables: { groupId: Number(id)! },
  });
  const group = data?.getGroup;

  if (loading) return <Loading />;

  const authorFullName = `${group?.author.firstName} ${group?.author.lastName}`;

  return <h1>Single group / challenge</h1>;
}

export default SingleGroup;
