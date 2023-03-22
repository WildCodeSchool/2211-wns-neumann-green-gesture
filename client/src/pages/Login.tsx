import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";

import Layout from "../containers/Layout";
import {
  GetUserByIdDocument,
  useGetUserEcoActionsQuery,
  useLoginMutation,
} from "../gql/generated/schema";
import client from "../gql/client";

function Login() {
  const [email, setEmail] = useState("test24@gmail.com");
  const [password, setPassword] = useState("testtest");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginUser, { loading: processing }] = useLoginMutation();

  //const {data}  = useGetUserEcoActionsQuery()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser({
        variables: { loginData: { email, password } },
        //refetchQueries: [{ query: GetUserByIdDocument }],
      });
      navigate("/");
    } catch (err) {
      console.error("err", err);
    } finally {
      setEmail("");
      setPassword("");
      client.resetStore();
    }
  };

  return (
    <Layout>
      <Stack spacing={4} alignItems="center" my={8}>
        <Text as="h1" fontSize={48}>
          Green Gesture
        </Text>
        <Box
          onSubmit={handleSubmit}
          as="form"
          sx={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: 4,
            textAlign: "center",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <Text as="h2" fontSize={32}>
            Se connecter
          </Text>
          <Stack spacing={3} mt={4} paddingX={8}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                required={true}
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required={true}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Button
            type="submit"
            colorScheme="green"
            sx={{
              textTransform: "uppercase",
              marginTop: 5,
              marginBottom: 1,
              bg: "accent",
              color: "white",
            }}
          >
            Je me connecte
          </Button>
          <Text>
            Pas encore inscrit ?{" "}
            <ChakraLink as={Link} to="/register" textDecoration="underline">
              S'inscrire
            </ChakraLink>
          </Text>
        </Box>
      </Stack>
    </Layout>
  );
}

export default Login;
