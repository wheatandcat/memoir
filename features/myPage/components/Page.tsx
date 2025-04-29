import View from "@/components/elements/View";
import Authenticated from "@/components/layouts/MyPage/Authenticated";
import NotAuthenticated from "@/components/layouts/MyPage/NotAuthenticated";
import theme from "@/config/theme";
import type { User } from "@/store/atoms";
import type { FC } from "react";
import React, { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { ConnectedType } from "./type";

export type Props = {
  user?: User;
  authenticated?: boolean;
} & ConnectedType;

const Page: FC<Props> = (props) => {
  return (
    <ScrollView>
      <View style={styles.root}>
        {props.authenticated ? (
          <Authenticated
            user={props.user as User}
            deleting={props.deleting}
            relationshipRequestCount={props.relationshipRequestCount}
            relationships={props.relationships}
            onLogout={props.onLogout}
            onUpdateProfile={props.onUpdateProfile}
            onAddShareUser={props.onAddShareUser}
            onRelationshipRequests={props.onRelationshipRequests}
            onDeleteRelationship={props.onDeleteRelationship}
          />
        ) : (
          <NotAuthenticated
            user={props.user as User}
            onUpdateProfile={props.onUpdateProfile}
            onLogin={props.onLogin}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    width: "100%",
  },
});

export default memo(Page);
