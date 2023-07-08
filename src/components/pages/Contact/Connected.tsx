import React, { memo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateContact from 'components/templates/Contact/Page';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import * as Device from 'expo-device';
import { Platform, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';

type Props = {};

const url = Constants.expoConfig?.extra?.INQUIRY_API || '';

export type ConnectedType = {
  userID: string;
  loading: boolean;
  send: boolean;
  text: string;
  onContact: (text: string) => void;
  onChangeText: (text: string) => void;
  onClose: () => void;
};

type Request = {
  body: string;
  name: string;
  email: string;
  env: string;
  userID: string;
  device: string;
  category: string;
};

const Connected: React.FC<Props> = () => {
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [text, setText] = useState('');

  const onContact = useCallback(async () => {
    if (text.length === 0) {
      Alert.alert('コメントが入力されていません');
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    const req: Request = {
      body: text,
      name: user.displayName || '無名',
      email: 'foobazbar@gmail.com',
      userID: user.userID || '無し',
      env: 'アプリ',
      device: `${Platform.OS}/${Platform.Version}/${Device.modelName}/${String(
        Device.osInternalBuildId
      )}`,
      category: 'フィードバックを送信',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      setLoading(false);
      Alert.alert('送信に失敗しました');
      return;
    }

    setSend(true);
  }, [user, text, loading]);

  const onClose = useCallback(() => {
    setSend(false);
    navigation.goBack();
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View pr={2} mr={1}>
          <TouchableOpacity onPress={onContact}>
            <Text>送信</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, onContact]);

  return (
    <TemplateContact
      send={send}
      userID={user.id ?? ''}
      loading={loading}
      onContact={onContact}
      text={text}
      onChangeText={setText}
      onClose={onClose}
    />
  );
};

export default memo(Connected);
