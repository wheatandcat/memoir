import { memo, useCallback, useState, type FC } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { setItem, storageKey } from 'lib/storage';
import * as Updates from 'expo-updates';
import * as Clipboard from 'expo-clipboard';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import View from '@/components/elements/View';
import Text from '@/components/elements/Text';
import Divider from '@/components/elements/Divider';
import TextInput from '@/components/elements/TextInput';
import Button from '@/components/elements/Button';
import theme from 'config/theme';
import Auth from 'lib/auth';

const auth = new Auth();

const Debug: FC = () => {
  const user = useRecoilValue(userState);
  const [userID, setUserID] = useState('');

  const onCopyUserID = useCallback(() => {
    Clipboard.setStringAsync(user.userID || '');
    Alert.alert('コピーしました');
  }, [user.userID]);

  const onCopyToken = useCallback(async () => {
    const token = await auth.getIdToken();
    console.log(`Bearer ${token}`);

    await Clipboard.setStringAsync(`Bearer ${token}`);
    Alert.alert('コピーしました');
  }, []);

  const onChangeUserID = useCallback(async () => {
    if (!userID || userID === '') {
      Alert.alert('ユーザーIDの指定がありません');
      return;
    }
    await setItem(storageKey.USER_ID_KEY, userID);
    Alert.alert('アプリを再起動します');
    Updates.reloadAsync();
  }, [userID]);

  const onLocalPushNotification = useCallback(async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }

    Notifications.scheduleNotificationAsync({
      content: {
        body: 'Push通知テスト',
        data: {
          urlScheme: 'MyPage',
        },
      },
      trigger: {
        seconds: 3,
      },
    });

    Alert.alert('3秒後に通知を設定しました');
  }, []);

  return (
    <View style={styles.root} pt={2}>
      <View>
        <Text color="error">▼ デバッグ機能</Text>
      </View>
      <Divider my={3} />
      <TouchableOpacity onPress={onCopyUserID}>
        <View>
          <Text>ユーザーIDをコピーする</Text>
        </View>
      </TouchableOpacity>
      <Divider my={3} />
      <TouchableOpacity onPress={onCopyToken}>
        <View>
          <Text>トークンをコピーする</Text>
        </View>
      </TouchableOpacity>
      <Divider my={3} />
      <View>
        <Text>ユーザーIDを設定する</Text>
        <View style={styles.input}>
          <View style={styles.inputText}>
            <TextInput
              placeholder="ユーザーID"
              returnKeyType="done"
              onChangeText={(text) => setUserID(text)}
            />
          </View>
          <View style={styles.inputButton}>
            <Button size="sm" title="変更" onPress={onChangeUserID} />
          </View>
        </View>
        <TouchableOpacity onPress={onLocalPushNotification}>
          <View>
            <Text fontFamily="NotoSansJP-Bold">ローカルPush通知テスト</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
      </View>
    </View>
  );
};

export default memo(Debug);

const styles = StyleSheet.create({
  root: {},
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputText: {
    width: '70%',
    marginVertical: theme().space(2),
  },
  inputButton: {
    width: '30%',
    margin: theme().space(2),
  },
});
