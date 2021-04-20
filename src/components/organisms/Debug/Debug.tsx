import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import Clipboard from 'expo-clipboard';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Divider from 'components/atoms/Divider';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';
import theme from 'config/theme';

type Props = {};

const Menu: React.FC<Props> = () => {
  const user = useRecoilValue(userState);
  const [userID, setUserID] = useState('');

  const onCopyUserID = useCallback(() => {
    Clipboard.setString(user.id || '');
    Alert.alert('コピーしました');
  }, [user.id]);

  const onChangeUserID = useCallback(async () => {
    if (!userID || userID === '') {
      Alert.alert('ユーザーIDの指定がありません');
      return;
    }
    await AsyncStorage.setItem('USER_ID', userID);
    Alert.alert('アプリを再起動します');
    Updates.reloadAsync();
  }, [userID]);

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
      </View>
    </View>
  );
};

export default memo(Menu);

const styles = StyleSheet.create({
  root: {},
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputText: {
    width: '80%',
    marginVertical: theme().space(2),
  },
  inputButton: {
    width: '20%',
    margin: theme().space(2),
  },
});
