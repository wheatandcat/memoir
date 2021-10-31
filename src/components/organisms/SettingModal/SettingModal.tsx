import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Modal from 'components/organisms/Modal';
import Divider from 'components/atoms/Divider';
import Constants from 'expo-constants';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import theme from 'config/theme';
import Debug from 'components/organisms/Debug/Debug';
import { useNotification } from 'containers/Notification';
import { authUserState, userState } from 'store/atoms';
import { storageKey, removeItem } from 'lib/storage';
import { ScreenNavigationProp as HomeScreenNavigationProp } from 'components/pages/Home';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const SettingModal: React.FC<Props> = (props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { onPermissionRequest } = useNotification();
  const authUser = useRecoilValue(authUserState);
  const setUser = useSetRecoilState(userState);

  const onLicence = useCallback(() => {
    props.onClose();

    navigation.navigate('SettingLicence');
  }, [navigation, props]);

  const onMyPage = useCallback(() => {
    props.onClose();

    navigation.navigate('MyPage');
  }, [navigation, props]);

  const onSettingMemoir = useCallback(() => {
    props.onClose();

    navigation.navigate('SettingMemoir');
  }, [navigation, props]);

  const onLogout = useCallback(async () => {
    await removeItem(storageKey.USER_ID_KEY);
    await removeItem(storageKey.AUTH_UID_KEY);

    setUser({ id: null, userID: '', displayName: '', image: '' });
  }, [setUser]);

  const onPushNotificationSetting = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:')
        .then((supported) => {
          if (supported) {
            return Linking.openURL('app-settings:');
          }

          console.log('move to app-settings: not supported');
          return;
        })
        .catch((err) => console.log(err));
    } else {
      startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
    }
  }, []);

  const onNotificationSetting = useCallback(async () => {
    if (!onPermissionRequest) {
      return;
    }

    onPermissionRequest(onPushNotificationSetting);
  }, [onPermissionRequest, onPushNotificationSetting]);

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
        <TouchableOpacity
          style={styles.menuText}
          onPress={onNotificationSetting}
        >
          <View>
            <Text>通知設定</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText}>
          <View>
            <Text>規約</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onLicence}>
          <View>
            <Text>著作権</Text>
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

        {!Constants.isDevice && <Debug />}
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
