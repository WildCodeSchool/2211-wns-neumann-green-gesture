import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CreateGroupButton() {
  return (
    <Button
      size="md"
      rightIcon={<AddIcon />}
      bgColor={"#007DFF"}
      _hover={{ bgColor: "#0062CC" }}
      color={"#fff"}
      variant="solid"
      borderRadius="3px"
      shadow={"xl"}
      as={Link}
      to="/create-group"
    >
      Créer un groupe
    </Button>
  );
}

export default CreateGroupButton;
