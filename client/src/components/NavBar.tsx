import { Box, Flex, HStack, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box px="6" py="5" backgroundColor="primary.main">
      <Container maxW="container.2xl">
        <Flex align="center" justify="space-between">
          <Link to="/">Logo</Link>
          <HStack as="nav" spacing="5">
            <p>Notif</p>
            <Link to="/profile">Profile</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
