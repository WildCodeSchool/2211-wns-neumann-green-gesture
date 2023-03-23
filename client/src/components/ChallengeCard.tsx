import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  challengeName: string;
  startDate: string;
  endDate: string;
  participants: number;
}

function ChallengeCard({
  challengeName,
  startDate,
  endDate,
  participants,
}: Props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
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
      <Text alignSelf={"end"}>{participants} participants</Text>
    </Box>
  );
}

export default ChallengeCard;
