import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import TemplateUpdateProfile from 'components/templates/UpdateProfile/Page';
import { userState } from 'store/atoms';
import {
  UpdateUserDocument,
  UpdateUserMutationVariables,
} from 'queries/api/index';
import { uploadImageAsync } from 'lib/image';
import { useMutation } from '@apollo/client';
import { User } from 'queries/api/index';

type Props = {};

type Input = {
  displayName: string;
  image: string;
};

export type ConnectedType = {
  authenticated: boolean;
  onSave: (input: Input) => void;
};

const Connected: React.FC<Props> = () => {
  const [user, setUser] = useRecoilState(userState);
  const authUser = useRecoilValue(authUserState);
  const navigation = useNavigation();
  const [updateUserMutation, updateUserMutationData] = useMutation(
    UpdateUserDocument,
    {
      async onCompleted(data) {
        const param: Partial<User> = {
          displayName: data.updateUser.displayName,
        };

        if (data.updateUser.image !== '') {
          param.image = data.updateUser.image;
        }

        setUser((s) => ({
          ...s,
          ...param,
        }));

        navigation.goBack();
      },
      async onError() {
        // エラーになった場合はログアウトさせる
        Alert.alert('エラー', '保存に失敗しました');
      },
    }
  );

  const onSave = useCallback(
    async (input: Input) => {
      const variables: UpdateUserMutationVariables = {
        input: {
          displayName: input.displayName,
          image: '',
        },
      };

      if (input.image !== '' && user.image !== input.image) {
        const image = await uploadImageAsync(input.image, user?.id || uuidv4());
        variables.input.image = image;
      }

      updateUserMutation({ variables });
    },
    [updateUserMutation, user.image, user.id]
  );

  return (
    <TemplateUpdateProfile
      authenticated={!!authUser.uid}
      loading={updateUserMutationData.loading}
      onSave={onSave}
      user={user}
    />
  );
};

export default memo(Connected);
