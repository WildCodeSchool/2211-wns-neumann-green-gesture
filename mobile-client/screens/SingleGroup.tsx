import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { EcoAction, useGetGroupQuery } from "../gql/generated/schema";
import { EcoActionListItem } from "../components/EcoActionListItem";

interface Props {
  route: any;
}

export default function SingleGroup({ route }: Props) {
  const groupId = route.params.id;
  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: +groupId },
  });
  const challenge = challengeData?.getGroup;

  return (
    <View style={styles.container}>
      <Text style={styles.challengeTitle}>{challenge?.challengeName}</Text>
      <View style={styles.challengeInfos}>
        <Text style={styles.basicText}>
          Créé par{" "}
          <Text style={styles.basicBold}>
            {challenge?.author.firstName} {challenge?.author.lastName}
          </Text>
        </Text>
        {/* Utiliser le composant qui permet de dire "Commence dans" ou "Termine dans" */}
        <Text style={styles.basicText}>{challenge?.endDate}</Text>
      </View>
      <FlatList
        data={challenge?.ecoActions}
        refreshing={groupLoading}
        renderItem={({ item: ecoAction }) => (
          <EcoActionListItem
            ecoAction={ecoAction as EcoAction}
            // userEcoActions={}
          />
        )}
        contentContainerStyle={{
          marginTop: 30,
          width: "100%",
          gap: 30,
        }}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Pas de groupes...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    width: "100%",
  },
  challengeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  challengeInfos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  basicText: {
    fontSize: 18,
  },
  basicBold: {
    fontWeight: "bold",
  },
});
