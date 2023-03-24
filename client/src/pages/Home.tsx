import { Button, Center, Flex, Image, Heading } from "@chakra-ui/react";
import Layout from "../containers/Layout";
import { useGetUserGroupsQuery } from "../gql/generated/schema";
import ChallengeCard from "../components/ChallengeCard";
import { Link } from "react-router-dom";
import CreateGroupButton from "../components/CreateGroupButton";

function Home() {
  const { data, refetch } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];
  refetch();

  return (
    <Layout>
      <>
        <Flex flexDirection={"column"} justifyContent={"space-around"}>
          <Flex pt={"1.5rem"} pe={"2rem"} justifyContent={"end"}>
            <CreateGroupButton />
          </Flex>
          {groups.length === 0 ? (
            <Center>
              <Flex
                flexDirection={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Image
                  w={"100%"}
                  maxW={"400px"}
                  src="./src/assets/images/empty-mountain.png"
                  alt="Dan Abramov"
                />
                <Heading as="h1" size="xl" textAlign={"center"}>
                  Tu n'as pas encores de challenges...
                </Heading>
                <Button
                  height="55px"
                  width="200px"
                  mt={"1rem"}
                  bgColor={"#F69503"}
                  _hover={{ bgColor: "#DD8604" }}
                  variant="solid"
                  borderRadius="3px"
                  color={"#fff"}
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  shadow={"xl"}
                >
                  Je me lance !
                </Button>
              </Flex>
            </Center>
          ) : (
            <>
              <Heading as="h1" size="xl">
                Mes Challenges en cours
              </Heading>
              <Flex
                flexWrap={"wrap"}
                p="2rem"
                sx={{
                  "@media (max-width: 726px)": { justifyContent: "center" },
                }}
              >
                {groups.map((group) => (
                  <Link to={`/group/${group.id}`} key={group.id}>
                    <ChallengeCard
                      challengeName={group.challengeName}
                      startDate={group.startDate}
                      endDate={group.endDate}
                      participants={group.users.length}
                    />
                  </Link>
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </>
    </Layout>
  );
}

export default Home;
