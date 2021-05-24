import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import theme from 'config/theme';
import UserImage from 'components/molecules/User/Image';

export type Props = {};

const InviteCard: React.FC<Props> = () => {
  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <View style={styles.user}>
          <UserImage image={''} size={80} />
          <View py={3}>
            <Text size="sm">田中太郎</Text>
          </View>
        </View>
        <View style={styles.invite}>
          <Text>
            <Text size="sm" color="baseDark" textAlign="left">
              招待コード
            </Text>
            {'\n'}
            <Text size="lg" color="primary" textAlign="left">
              ABCDEFGHIJKLMN
            </Text>
          </Text>
        </View>
        <View pt={4}>
          <Button title="招待コードをコピー" onPress={() => null} />
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
  user: {
    alignItems: 'center',
  },
  invite: {
    alignItems: 'center',

    paddingTop: theme().space(3),
    paddingHorizontal: theme().space(5),
  },
});

export default memo(InviteCard);
