import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetGroupQuery } from "../gql/generated/schema";

interface Props {
  route: any;
}

export default function SingleGroup({ route }: Props) {
  const groupId = route.params.id;
  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: +groupId },
  });
  const challenge = challengeData?.getGroup;

  console.log("challenge", challenge);

  return (
    <View>
      <Text>{challenge?.challengeName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
