import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import { User } from 'store/atoms';

export type Props = {
  user: User;
  onUpdateProfile: () => void;
  onLogout: () => void;
};

const Authenticated: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View mt={4}>
        <Image source={require('../../../img/icon/icon_account_default.png')} />
      </View>
      <View m={4}>
        <TouchableOpacity onPress={props.onUpdateProfile}>
          <View style={styles.userInfo}>
            <Text>{props.user?.displayName || '表示名の設定がありません'}</Text>
            <MaterialIcons
              name="chevron-right"
              size={23}
              color={theme().color.secondary.main}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View mt={5}>
        <TouchableOpacity onPress={props.onLogout}>
          <View style={styles.logout}>
            <Text>ログアウト</Text>
          </View>
        </TouchableOpacity>
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
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    backgroundColor: theme().color.primary.main,
    width: 200,
    paddingVertical: theme().space(3),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Authenticated);
