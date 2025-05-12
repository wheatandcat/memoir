import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Notification from "@/components/layouts/RelationshipRequest/Notification";
import ShareUsers from "@/components/layouts/ShareUser/List";
import UserImage from "@/components/layouts/User/Image";
import theme from "@/config/theme";
import type { ConnectedType } from "@/features/myPage/components/type";
import type { User } from "@/store/userStore";
import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export type Props = {
  user: User;
  relationshipRequestCount: number;
} & Pick<
  ConnectedType,
  | "onUpdateProfile"
  | "onLogout"
  | "onRelationshipRequests"
  | "onAddShareUser"
  | "relationshipRequestCount"
  | "relationships"
  | "deleting"
  | "onDeleteRelationship"
>;

const Authenticated: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <View mt={4}>
          <TouchableOpacity onPress={props.onUpdateProfile}>
            <UserImage image={props.user.image} />
          </TouchableOpacity>
        </View>
        <View m={4}>
          <TouchableOpacity onPress={props.onUpdateProfile}>
            <View style={styles.userInfo}>
              <Text>
                {props.user?.displayName || "表示名の設定がありません"}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={23}
                color={theme().color.secondary.main}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.share}>
          <View style={styles.divider} />

          <View>
            <Text variants="middle">共有メンバー</Text>
          </View>

          <View style={styles.divider} />
        </View>
      </View>
      {props.relationshipRequestCount !== 0 && (
        <View mt={3} mb={2}>
          <Notification
            count={props.relationshipRequestCount}
            onPress={props.onRelationshipRequests}
          />
        </View>
      )}

      <ShareUsers
        deleting={props.deleting}
        onAdd={props.onAddShareUser}
        relationships={props.relationships}
        onDeleteRelationship={props.onDeleteRelationship}
      />

      <View mt={5} style={styles.action}>
        <TouchableOpacity onPress={props.onLogout}>
          <View style={styles.logout}>
            <Text>ログアウト</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
  },
  user: {
    width: "100%",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    backgroundColor: theme().color.primary.main,
    width: 200,
    paddingVertical: theme().space(3),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: theme().color.base.main,
    width: "25%",
    marginHorizontal: theme().space(3),
  },
  action: {
    alignItems: "center",
  },
});

export default memo(Authenticated);
