import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import TemplateUpdateProfile from 'components/templates/UpdateProfile/Page';
import { userState } from 'store/atoms';
import {
  useUpdateUserMutation,
  UpdateUserMutationVariables,
} from 'queries/api/index';

export type Props = {};

type Input = {
  displayName: string;
};

export type ConnectedType = {
  onSave: (input: Input) => void;
};

const Connected: React.FC<Props> = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  const [updateUserMutation, updateUserMutationData] = useUpdateUserMutation({
    async onCompleted(data) {
      setUser((s) => ({
        ...s,
        displayName: data.updateUser.displayName,
      }));

      navigation.goBack();
    },
    async onError() {
      // エラーになった場合はログアウトさせる
      Alert.alert('エラー', '保存に失敗しました');
    },
  });

  const onSave = useCallback(
    async (input: Input) => {
      const variables: UpdateUserMutationVariables = {
        input: input,
      };

      updateUserMutation({ variables });
    },
    [updateUserMutation]
  );

  return (
    <TemplateUpdateProfile
      loading={updateUserMutationData.loading}
      onSave={onSave}
      user={user}
    />
  );
};

export default memo(Connected);
