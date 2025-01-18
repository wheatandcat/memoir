import View from "@/components/elements/View";
import type { ConnectedType } from "components/pages/MyPage/Connected";
import theme from "config/theme";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";
import type { User as UserType } from "store/atoms";
import AddButton from "./AddButton";
import User from "./User";

export type Props = {
  deleting: ConnectedType["deleting"];
  relationships: ConnectedType["relationships"];
  onDeleteRelationship: ConnectedType["onDeleteRelationship"];
  onAdd: () => void;
};

const List: FC<Props> = (props) => {
  const relationships = props.relationships;
  const add = (props.relationships.length + 1) % 3;

  for (let i = 0; i <= add; i++) {
    relationships.push(null as any);
  }

  return (
    <View style={styles.root} testID="share-user-list">
      <View>
        <AddButton onAdd={props.onAdd} />
      </View>
      {relationships.map((v) => {
        if (v == null) {
          return <View key={-1} style={styles.block} />;
        }

        return (
          <User
            key={v.id}
            loading={props.deleting}
            user={v.user as UserType}
            onDeleteRelationship={props.onDeleteRelationship}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    width: "100%",
    padding: theme().space(3),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  block: {
    width: 110,
  },
});

export default memo(List);
