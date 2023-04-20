import { StyleSheet, Text, View, FlatList } from "react-native";
import { Group, useGetUserGroupsQuery } from "../gql/generated/schema";
import { GroupListItem } from "../components/GroupListItem";

export default function Home() {
  const { loading: loadingGroups, data } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        refreshing={loadingGroups}
        renderItem={({ item }) => <GroupListItem group={item as Group} />}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Pas de groupesezez</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
});
