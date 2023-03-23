import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  id: number;
  challengeName: string;
  startDate: string;
  endDate: string;
}

function ChallengeCard({ id, challengeName, startDate, endDate }: Props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      key={id}
      height="150px"
      width="300px"
      bgColor="#554CBB"
      color="#fff"
      borderRadius="10px"
      m="1rem"
      p=".5rem"
      _hover={{ boxShadow: "dark-lg" }}
      transition="all 0.3s"
    >
      <Heading as="h5" size="md">
        {challengeName}
      </Heading>
      <Text fontSize={"xs"}>{`du ${startDate} au ${endDate}`}</Text>
      <Text alignSelf={"end"}>Participants</Text>
    </Box>
  );
}

export default ChallengeCard;
