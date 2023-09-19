import { View, Text, StyleSheet } from "react-native";
import { EcoAction, UserEcoAction } from "../gql/generated/schema";

interface EcoActionListItemProps {
  ecoAction: EcoAction;
  userEcoAction?: UserEcoAction;
}

export const EcoActionListItem = ({
  ecoAction,
  userEcoAction,
}: EcoActionListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ecoActionName}>{ecoAction.name}</Text>
      <Text style={styles.ecoActionDescription}>{ecoAction.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    textAlign: "center",
    padding: 10,
    gap: 5,
  },
  ecoActionName: {
    fontSize: 20,
    color: "white",
  },
  ecoActionDescription: {
    fontSize: 15,
    color: "white",
  },
});
