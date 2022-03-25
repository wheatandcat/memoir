import React, { memo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateContact from 'components/templates/Contact/Page';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';

export type Props = {};

const url = process.env.INQUIRY_API || '';

export type ConnectedType = {
  userID: string;
  loading: boolean;
  onContact: (text: string) => void;
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

  const onContact = useCallback(
    async (text: string) => {
      setLoading(true);

      const req: Request = {
        body: text,
        name: user.displayName || '無名',
        email: 'foobazbar@gmail.com',
        userID: user.userID || '無し',
        env: 'アプリ',
        device: `${Platform.OS}/${Platform.Version}/${
          Device.modelName
        }/${String(Device.osInternalBuildId)}`,
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

      navigation.goBack();
    },
    [navigation, user]
  );

  return (
    <TemplateContact
      userID={user.id ?? ''}
      loading={loading}
      onContact={onContact}
    />
  );
};

export default memo(Connected);
