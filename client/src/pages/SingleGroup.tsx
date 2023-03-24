import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CreateGroupButton from "../components/CreateGroupButton";
import Layout from "../containers/Layout";
import { useGetGroupQuery } from "../gql/generated/schema";

function SingleGroup() {
  const { id } = useParams();
  const { data, loading } = useGetGroupQuery({
    variables: { groupId: Number(id)! },
  });
  const group = data?.getGroup;

  if (loading) return <Text>Loading...</Text>;

  const authorFullName = `${group?.author.firstName} ${group?.author.lastName}`;

  return (
    <Layout>
      <Flex
        py={"1.5rem"}
        px={"2rem"}
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack align="start" spacing={1}>
          <Heading as="h1" size="xl">
            {group?.challengeName}
          </Heading>
          <Text>
            crée par{" "}
            <Text as="span" fontWeight={600} color="primary.main">
              {authorFullName}
            </Text>
          </Text>
        </VStack>
        <CreateGroupButton />
      </Flex>

      <Flex px={"2rem"} mt="1rem" justifyContent="space-between" gap={4}>
        <VStack align="start" flex="60%" spacing={4}>
          <Box w="full" boxShadow="base" rounded={4} p={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <Heading as="h2" size="lg" mb={5}>
                Mes défis
              </Heading>
              <Text>1/12 défis réussis</Text>
            </HStack>

            <List spacing={4}>
              {group?.ecoActions.map((action) => {
                return (
                  <ListItem key={action.id}>
                    <Text fontWeight={500}>{action.name}</Text>
                  </ListItem>
                );
              })}
            </List>
            <Text
              color="primary.main"
              fontSize="xs"
              fontWeight={600}
              textAlign="right"
              mt={2}
            >
              15/45 points
            </Text>
          </Box>
          <Box w="full" boxShadow="base" rounded={4} p={4}>
            <Heading as="h2" size="lg" mb={4}>
              Commentaires
            </Heading>
            <FormControl>
              <FormLabel htmlFor="comment">Ajouter un commentaire</FormLabel>
              <Textarea placeholder="Entrez votre commentaire ici..." />
              <FormHelperText fontSize="xs">
                500 caractères restants
              </FormHelperText>
            </FormControl>

            <List spacing={4} mt={4}>
              {["Commentaire 1", "Commentaire 2", "Commentaire 3"].map(
                (comment) => (
                  <ListItem
                    p={4}
                    key={comment}
                    borderBottom="1px solid gray"
                    position="relative"
                  >
                    <Text fontSize="sm">{comment}</Text>
                    <Text
                      as="span"
                      fontSize="xs"
                      position="absolute"
                      top={2}
                      right={2}
                    >
                      Jhon Doe
                    </Text>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </VStack>
        <Box flex="40%" boxShadow="base" p={4} rounded={4}>
          <Heading as="h2" size="lg" mb={5}>
            Liste des participants
          </Heading>
          <List spacing={4}>
            {group?.users.map((user) => {
              const participantName = `${user.firstName} ${user.lastName}`;
              return (
                <ListItem
                  as={HStack}
                  key={user.id}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Center
                      bgColor="accent"
                      color="white"
                      rounded="full"
                      h={5}
                      w={5}
                    >
                      {user.firstName.slice(0, 1)}
                    </Center>
                    <Text>{participantName}</Text>
                  </HStack>
                  <Text>10/35 points</Text>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Flex>
    </Layout>
  );
}

export default SingleGroup;
