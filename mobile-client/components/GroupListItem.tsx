import { View, Text, StyleSheet } from "react-native";
import { Group } from "../gql/generated/schema";

interface GroupListItemProps {
  group: Group;
}

export const GroupListItem = ({ group }: GroupListItemProps) => {
  return (
    <View style={styles.group}>
      <Text style={styles.text}>{group.challengeName}</Text>
      <Text style={styles.text}>Créé par {group.author.firstName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    backgroundColor: "green",
    padding: 10,
    gap: 10,
    marginTop: 30,
  },
  text: {
    color: "white",
  },
});
