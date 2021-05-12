import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ConnectedType } from 'components/pages/UpdateProfile/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import theme from 'config/theme';
import { User } from 'store/atoms';

export type Props = ConnectedType & {
  user: User;
  loading: boolean;
};

type State = {
  displayName: string;
};

const initialState = (user: User) => ({
  displayName: user.displayName,
});

const Page: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.user));

  return (
    <View style={styles.root}>
      <View mt={5}>
        <Image
          source={require('../../../img/icon/icon_account_default.png')}
          width={125}
          height={125}
          resizeMode="contain"
        />
        <View my={3}>
          <Text textAlign="center" size="sm">
            写真を変更
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="表示名"
          onChangeText={(text) =>
            setState((s) => ({ ...s, displayName: text }))
          }
          returnKeyType="done"
          defaultValue={state.displayName}
          style={styles.input}
        />
        <View my={3}>
          <Text textAlign="center" size="sm">
            表示名を入力したください
          </Text>
        </View>
      </View>
      <View mt={6} mb={3}>
        <Button
          title="保存"
          size="lg"
          width={200}
          disabled={props.loading}
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
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    padding: theme().space(4),
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: theme().fontSizes.xl,
  },
});

export default memo(Page);
