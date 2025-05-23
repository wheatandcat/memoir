import Button from "@/components/elements/Button";
import Loading from "@/components/elements/Loading";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import IconButton from "@/components/layouts/IconButton";
import UserImage from "@/components/layouts/User/Image";
import theme from "@/config/theme";
import type { Invite } from "@/features/setting/addShareUser/components/type";
import type { User } from "@/store/userStore";
import * as Clipboard from "expo-clipboard";
import type { FC } from "react";
import React, { memo, useCallback, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Toast from "react-native-root-toast";
import TutorialModal from "./TutorialModal";

export type Props = {
  user: User;
  invite: Invite;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  onCreateInvite: () => void;
  onUpdateInvite: () => void;
};

const InviteCard: FC<Props> = (props) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const height = useWindowDimensions().height;

  const onCopyInviteCode = useCallback(() => {
    Clipboard.setStringAsync(props.invite.code);

    const toast = Toast.show("招待コードがコピーされました", {
      duration: Toast.durations.LONG,
      position: height - 150,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    setTimeout(() => {
      Toast.hide(toast);
    }, 3000);
  }, [props.invite, height]);

  return (
    <>
      <TutorialModal
        isVisible={dialog}
        onClose={() => setDialog(false)}
        onPress={() => {
          props.onCreateInvite();
          setDialog(false);
        }}
      />
      <View style={styles.card}>
        <View style={styles.inner}>
          <View style={styles.user}>
            <UserImage image={props.user.image} size={80} />
            <View py={3}>
              <Text size="sm">{props.user.displayName || "未設定"}</Text>
            </View>
          </View>
          {props.invite.code === "" ? (
            <View pt={4}>
              <Button
                title="招待コードを作成する"
                loading={props.creating}
                onPress={() => setDialog(true)}
              />
            </View>
          ) : (
            <View>
              <View style={styles.invite}>
                {props.loading || props.updating ? (
                  <View style={styles.loading}>
                    <Loading size="large" />
                  </View>
                ) : (
                  <View style={styles.code}>
                    <View>
                      <View mb={1}>
                        <Text size="sm" color="baseDark" textAlign="left">
                          招待コード
                        </Text>
                      </View>
                      <Text size="lg" color="primary" textAlign="left">
                        {props.invite.code.substr(0, 2)}{" "}
                        {props.invite.code.substr(2, 2)}{" "}
                        {props.invite.code.substr(4, 2)}{" "}
                        {props.invite.code.substr(6, 2)}
                      </Text>
                    </View>
                    <View>
                      <IconButton
                        name="refresh"
                        size="sm"
                        color={theme().color.primary.main}
                        outline
                        onPress={props.onUpdateInvite}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View pt={4}>
                <Button title="招待コードをコピー" onPress={onCopyInviteCode} />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme().color.background.light,
    alignItems: "center",
    paddingVertical: theme().space(4),
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
  },
  inner: {
    width: 320,
  },
  user: {
    alignItems: "center",
  },
  invite: {
    alignItems: "center",
    paddingTop: theme().space(3),
    paddingHorizontal: theme().space(5),
  },
  code: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: 200,
    height: 50,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default memo(InviteCard);
