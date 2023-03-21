import { FormEvent, useState } from "react";
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
  ButtonGroup,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Layout from "../containers/Layout";
import { useCreateUserMutation, UsersDocument } from "../gql/generated/schema";

function Register() {
  const [createUser, { loading: processing }] = useCreateUserMutation();
  const [firstName, setFirstName] = useState("simon");
  const [lastName, setLastName] = useState("mandela");
  const [email, setEmail] = useState("test24@gmail.com");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("testtest");

  const [showPassword, setShowPassword] = useState(false);
  const [isFree, setIsFree] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUser({
        variables: { data: { email, firstName, lastName, password } },
        refetchQueries: [{ query: UsersDocument }],
      });
      navigate("/");
    } catch (err) {
      console.error("err", err);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setPassword("");
    }
  };

  return (
    <Layout>
      <Stack spacing={4} alignItems="center" my={8}>
        <Text as="h1" fontSize={48}>
          Bienvenue chez Green Gesture !
        </Text>
        <Box>
          <ButtonGroup isAttached size="sm" variant="outline">
            <Button
              isActive={isFree}
              _active={{ backgroundColor: "secondary", color: "white" }}
              onClick={() => setIsFree(!isFree)}
            >
              Free
            </Button>
            <Button
              isActive={!isFree}
              _active={{ backgroundColor: "secondary", color: "white" }}
              onClick={() => setIsFree(!isFree)}
            >
              Partner
            </Button>
          </ButtonGroup>
        </Box>
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
          <Stack spacing={0}>
            <Text as="h2" fontSize={32}>
              {isFree
                ? "Inscrivez-vous gratuitement"
                : "Inscrivez-vous et votre entreprise"}
            </Text>
            {!isFree && (
              <Text fontSize={14}>
                Faites participer vos salariés à des éco-challenges en équipes
              </Text>
            )}
          </Stack>
          <Stack spacing={3} mt={4} paddingX={8}>
            <FormControl>
              <FormLabel htmlFor="firstName">Prénom</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                onChange={({ target }) => setFirstName(target.value)}
                value={firstName}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Nom</FormLabel>
              <Input
                id="lastName"
                name="lastName"
                onChange={({ target }) => setLastName(target.value)}
                value={lastName}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                required={true}
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
            </FormControl>
            {!isFree && (
              <FormControl>
                <FormLabel htmlFor="company">Entreprise</FormLabel>
                <Input
                  id="company"
                  name="company"
                  required={true}
                  onChange={({ target }) => setCompany(target.value)}
                  value={company}
                />
              </FormControl>
            )}
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
            sx={{
              textTransform: "uppercase",
              marginTop: 5,
              marginBottom: 1,
              bg: "accent",
              color: "white",
            }}
          >
            Je m'inscris
          </Button>
          <Text>
            Déjà inscrit ?{" "}
            <ChakraLink as={Link} to="/login" textDecoration="underline">
              Se connecter
            </ChakraLink>
          </Text>
        </Box>
      </Stack>
    </Layout>
  );
}

export default Register;
