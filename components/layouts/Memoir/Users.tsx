import View from "@/components/elements/View";
import UserButton from "@/components/layouts/User/Button";
import UserImage from "@/components/layouts/User/Image";
import theme from "@/config/theme";
import type { Props as PlainProps } from "@/features/memoir/components/Plain";
import type { User } from "@/queries/api/index";
import type React from "react";
import { memo, useCallback } from "react";
import { ScrollView, StyleSheet, type ViewStyle } from "react-native";

type Users = Pick<User, "id" | "image">[];

export type Props = {
  users: Users;
  selectedUserIDList: PlainProps["selectedUserIDList"];
  onChangeUserID: PlainProps["onChangeUserID"];
  center?: boolean;
  size?: number;
};

const Users: React.FC<Props> = ({ center = false, size = 70, ...props }) => {
  const onAdd = useCallback(
    (uid: string) => {
      const userIDList = [...props.selectedUserIDList, uid];
      props.onChangeUserID(userIDList);
    },
    [props.selectedUserIDList, props.onChangeUserID]
  );

  const onRemove = useCallback(
    (uid: string) => {
      const userIDList = props.selectedUserIDList.filter((v) => v !== uid);
      props.onChangeUserID(userIDList);
    },
    [props.selectedUserIDList, props.onChangeUserID]
  );

  const style: ViewStyle[] = [styles.root];

  if (!center) {
    style.push(styles.left);
  }

  return (
    <ScrollView style={styles.wrap} horizontal testID="memoir-users">
      <View style={style}>
        {props.users.map((v) => {
          const selected = !!props.selectedUserIDList.find(
            (uid) => v.id === uid
          );

          if (selected) {
            if (props.selectedUserIDList.length === 1) {
              return (
                <View key={v.id} m={2}>
                  <UserImage size={size} image={v.image} />
                </View>
              );
            }
          }

          return (
            <UserButton
              key={v.id}
              user={v}
              selected={selected}
              size={size}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default memo(Users);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  left: {
    marginLeft: theme().space(4),
  },
  wrap: {
    flex: 1,
  },
});
