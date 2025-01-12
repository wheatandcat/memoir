import  { memo, type FC } from 'react';
import { StyleSheet } from 'react-native';
import View from '@/components/elements/View';
import Text from '@/components/elements/Text';
import Button from '@/components/elements/Button';
import theme from 'config/theme';

export type Props = {
  onOpen: () => void;
};

const InputInvite: FC<Props> = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <View mb={5}>
          <Text textAlign="center">共有メンバーを追加</Text>
        </View>
        <View style={styles.invite}>
          <Text>
            共有メンバーに追加したいユーザーの招待コードを入力してください
          </Text>
        </View>
        <View pt={4}>
          <Button title="招待コードを入力" onPress={props.onOpen} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme().color.background.light,
    alignItems: 'center',
    paddingVertical: theme().space(4),
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
  },
  inner: {
    width: 320,
  },
  invite: {
    alignItems: 'center',
    paddingVertical: theme().space(3),
  },
});

export default memo(InputInvite);
