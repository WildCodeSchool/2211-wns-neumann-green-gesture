import {
  Box,
  Flex,
  HStack,
  Container,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle, BiLogOut, BiHome, BiBell } from "react-icons/bi";
import { useLogoutMutation } from "../gql/generated/schema";

export default function NavBar() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const isLoggedIn = window.localStorage.getItem("gg_logged") === "isLogged";

  const handleLogout = async () => {
    try {
      // appel à la mutation de déconnexion
      const res = await logout();

      // remove gg_logged from localStorage
      window.localStorage.removeItem("gg_logged");

      // navigate to login page
      // window.location.href = "/login";
      navigate("/login");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Box px="6" py="5" backgroundColor="primary.main">
      <Container maxW="container.2xl">
        <Flex align="center" justify="space-between">
          <Link to="/">
            <BiHome size={24} />
          </Link>

          {isLoggedIn && (
            <HStack as="nav" spacing="5">
              <BiBell size={24} />
              <Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="profile menu"
                    icon={<BiUserCircle size={24} />}
                    variant="ghost"
                  />
                  <MenuList py={2}>
                    <MenuItem as={Link} to="/profile">
                      Mon profile
                    </MenuItem>
                    <MenuItem icon={<BiLogOut />} onClick={handleLogout}>
                      Se déconnecter
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
