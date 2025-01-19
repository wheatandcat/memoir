import Divider from "@/components/elements/Divider";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import Debug from "@/components/layouts/Debug/Debug";
import Modal from "@/components/layouts/Modal";
import theme from "@/config/theme";
import { useNotification } from "@/containers/Notification";
import { removeItem, storageKey } from "@/lib/storage";
import { authUserState, userState } from "@/store/atoms";
import * as Device from "expo-device";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import { useRouter } from "expo-router";
import { type FC, memo, useCallback } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const SettingModal: FC<Props> = (props) => {
  const router = useRouter();
  const { onPermissionRequest } = useNotification();
  const authUser = useRecoilValue(authUserState);
  const setUser = useSetRecoilState(userState);

  const onLicence = useCallback(() => {
    props.onClose();

    router.push("/setting/licence");
  }, [router, props]);

  const onMyPage = useCallback(() => {
    props.onClose();

    router.push("/my-page");
  }, [router, props]);

  const onSettingMemoir = useCallback(() => {
    props.onClose();

    router.push("/setting/memoir");
  }, [router, props]);

  const onPrivacy = useCallback(() => {
    props.onClose();

    router.push("/setting/privacy");
  }, [router, props]);

  const onTerms = useCallback(() => {
    props.onClose();

    router.push("/setting/terms");
  }, [router, props]);

  const onContact = useCallback(() => {
    props.onClose();

    router.push("/setting/contact");
  }, [router, props]);

  const onSettingDataManagement = useCallback(() => {
    props.onClose();

    router.push("/setting/data-management");
  }, [router, props]);

  const onLogout = useCallback(async () => {
    await removeItem(storageKey.USER_ID_KEY);
    await removeItem(storageKey.AUTH_UID_KEY);

    setUser({ id: null, userID: "", displayName: "", image: "" });
  }, [setUser]);

  const onPushNotificationSetting = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.canOpenURL("app-settings:")
        .then((supported) => {
          if (supported) {
            return Linking.openURL("app-settings:");
          }

          console.log("move to app-settings: not supported");
          return;
        })
        .catch((err) => console.log(err));
    } else {
      startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
    }
  }, []);

  const onNotificationSetting = useCallback(async () => {
    onPermissionRequest?.(onPushNotificationSetting);
  }, [onPermissionRequest, onPushNotificationSetting]);

  const onSearch = useCallback(() => {
    if (!authUser.uid) {
      Alert.alert("確認", "この機能はアカウント登録しないと実行できません", [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "登録する",
          onPress: () => {
            props.onClose();
            router.push("/my-page");
          },
        },
      ]);

      return;
    }

    props.onClose();

    router.push("/search");
  }, [router, props, authUser.uid]);

  return (
    <Modal isVisible={props.isVisible} title="設定" onClose={props.onClose}>
      <View style={styles.root} p={3} pt={4}>
        <TouchableOpacity style={styles.menuText} onPress={onMyPage}>
          <View>
            <Text>アカウント設定</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity onPress={onSettingMemoir} style={styles.menuText}>
          <View>
            <Text>ふりかえり日時を変更する</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity onPress={onSearch} style={styles.menuText}>
          <View>
            <Text>達成したタスクを検索する</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity
          style={styles.menuText}
          onPress={onNotificationSetting}
        >
          <View>
            <Text>通知設定</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity
          style={styles.menuText}
          onPress={onSettingDataManagement}
        >
          <View>
            <Text>データ管理</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onContact}>
          <View>
            <Text>フィードバックを送信</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onTerms}>
          <View>
            <Text>利用規約</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onPrivacy}>
          <View>
            <Text>プライバシー・ポリシー</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onLicence}>
          <View>
            <Text>ライセンス</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        {!authUser.uid && (
          <>
            <TouchableOpacity style={styles.menuText} onPress={onLogout}>
              <View>
                <Text color="error">ログアウト</Text>
              </View>
            </TouchableOpacity>
            <Divider my={3} />
          </>
        )}
        {!Device.isDevice && <Debug />}
      </View>
    </Modal>
  );
};

export default memo(SettingModal);

const styles = StyleSheet.create({
  root: {},
  menuText: {
    paddingLeft: theme().space(2),
  },
});
