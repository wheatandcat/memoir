import { uploadImageAsync } from "@/lib/image";
import {
  UpdateUserDocument,
  type UpdateUserMutationVariables,
  type User,
} from "@/queries/api/index";
import { authUserState, userState } from "@/store/atoms";
import { useMutation } from "@apollo/client";
import { useRouter } from "expo-router";
import type React from "react";
import { memo, useCallback } from "react";
import { Alert } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Page from "./Page";
import type { Input } from "./type";

const Connected: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const authUser = useRecoilValue(authUserState);
  const router = useRouter();
  const [updateUserMutation, updateUserMutationData] = useMutation(
    UpdateUserDocument,
    {
      async onCompleted(data) {
        const param: Partial<User> = {
          displayName: data.updateUser.displayName,
        };

        if (data.updateUser.image !== "") {
          param.image = data.updateUser.image;
        }

        setUser((s) => ({
          ...s,
          ...param,
        }));

        router.back();
      },
      async onError() {
        // エラーになった場合はログアウトさせる
        Alert.alert("エラー", "保存に失敗しました");
      },
    },
  );

  const onSave = useCallback(
    async (input: Input) => {
      const variables: UpdateUserMutationVariables = {
        input: {
          displayName: input.displayName,
          image: "",
        },
      };

      if (input.image !== "" && user.image !== input.image) {
        const image = await uploadImageAsync(input.image, user?.id || uuidv4());
        variables.input.image = image;
      }

      updateUserMutation({ variables });
    },
    [updateUserMutation, user.image, user.id],
  );

  return (
    <Page
      authenticated={!!authUser.uid}
      loading={updateUserMutationData.loading}
      onSave={onSave}
      user={user}
    />
  );
};

export default memo(Connected);
