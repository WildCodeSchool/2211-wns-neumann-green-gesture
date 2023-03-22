import Layout from "../containers/Layout";
import { useGetCurrentUserQuery } from "../gql/generated/schema";

function Home() {
  const { data } = useGetCurrentUserQuery();
  console.log(data);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

export default Home;
