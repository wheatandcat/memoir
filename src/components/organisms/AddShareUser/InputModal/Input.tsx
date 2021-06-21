import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import InputCode from 'components/molecules/InputCode/InputCode';

export type Props = {
  code: string;
  onChange: (code: string) => void;
};

const Input: React.FC<Props> = (props) => {
  return (
    <>
      <View style={styles.invite}>
        <Text>
          振り返りを共有したいユーザーの{'\n'}
          招待コードを入力してください
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <InputCode value={props.code} onChange={props.onChange} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  invite: {
    alignItems: 'center',
    paddingTop: theme().space(3),
    paddingBottom: theme().space(2),
  },
  inputContainer: {
    marginLeft: theme().space(3),
    marginTop: theme().space(4),
    width: 280,
  },
});

export default memo(Input);
