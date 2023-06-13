import { useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import { useGetGroupQuery } from "../gql/generated/schema";

function SingleGroup() {
  const { id } = useParams();
  const { data, loading } = useGetGroupQuery({
    variables: { groupId: Number(id)! },
  });
  const group = data?.getGroup;

  if (loading) return <p>Loading...</p>;

  const authorFullName = `${group?.author.firstName} ${group?.author.lastName}`;

  return (
    <h1>Single group / challenge</h1>
  );
}

export default SingleGroup;
