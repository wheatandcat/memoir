import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import TextInput from "@/components/elements/TextInput";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { User } from "@/store/userStore";
import type React from "react";
import { memo, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import ProfileImage from "./ProfileImage";
import type { ConnectedType } from "./type";

export type Props = ConnectedType & {
  user: User;
  loading: boolean;
};

type State = {
  displayName: string;
  image: string;
};

const initialState = (user: User) => ({
  displayName: user.displayName,
  image: user.image,
});

const Page: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.user));

  const disabledButton = useCallback(() => {
    if (state.displayName.length === 0) {
      return true;
    }

    if (state.displayName.length > 20) {
      return true;
    }

    return false;
  }, [state.displayName]);

  return (
    <View style={styles.root}>
      <ProfileImage
        authenticated={props.authenticated}
        image={props.user.image}
        onChangeImage={(uri) => setState((s) => ({ ...s, image: uri }))}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="表示名"
          onChangeText={(text) =>
            setState((s) => ({ ...s, displayName: text }))
          }
          returnKeyType="done"
          defaultValue={state.displayName}
          style={styles.input}
          maxLength={15}
        />
        <View my={3}>
          <Text textAlign="center" size="sm">
            表示名を入力してください
          </Text>
        </View>
      </View>
      <View mt={6} mb={3}>
        <Button
          title="保存"
          size="lg"
          width={200}
          disabled={props.loading || disabledButton()}
          loading={props.loading}
          onPress={() => props.onSave(state)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    padding: theme().space(4),
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    fontSize: theme().fontSizes.xl,
  },
});

export default memo(Page);
