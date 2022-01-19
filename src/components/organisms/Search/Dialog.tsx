import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import UserImage from 'components/molecules/User/Image';
import theme from 'config/theme';
import { User } from 'store/atoms';

export type Props = {
  users: Omit<User, 'userID'>[];
};

const Dialog: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View pt={3}>
        <Text variants="small">日付</Text>
      </View>
      <View pt={4} style={styles.inputDate}>
        <View style={styles.dateText}>
          <Text variants="middle">2021.12.01</Text>
        </View>
        <View mx={2}>
          <Text>-</Text>
        </View>
        <View style={styles.dateText}>
          <Text variants="middle">2021.12.31</Text>
        </View>
      </View>
      <View pt={4}>
        <View pb={3}>
          <Text variants="small" textAlign="center">
            共有メンバー
          </Text>
        </View>

        <View style={styles.users}>
          {props.users.map((v) => (
            <View px={3}>
              <UserImage image={v.image} size={50} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    alignItems: 'center',
    width: '100%',
  },
  inputDate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    borderColor: theme().color.secondary.main,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  users: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(Dialog);
