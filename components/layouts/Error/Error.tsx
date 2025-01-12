import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import View from '@/components/elements/View';
import Text from '@/components/elements/Text';
import type { ApolloError } from '@apollo/client';
import theme from 'config/theme';

type Props = {
  error?: ApolloError;
};

const tError: FC<Props> = (props) => {
  return (
    <View>
      <Text style={styles.text}>エラーが発生しました</Text>
      <Text>{props.error?.message ?? ''}</Text>
    </View>
  );
};

export default tError;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: theme().color.background.light,
  },
});
