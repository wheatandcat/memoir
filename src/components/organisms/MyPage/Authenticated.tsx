import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import { User } from 'store/atoms';
import UserImage from 'components/molecules/User/Image';
import ShareUsers from 'components/organisms/ShareUser/List';

export type Props = {
  user: User;
  onUpdateProfile: () => void;
  onLogout: () => void;
  onAddShareUser: () => void;
};

const Authenticated: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View mt={4}>
        <UserImage image={props.user.image} />
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
      <View>
        <View style={styles.share}>
          <View style={styles.divider} />

          <View>
            <Text variants="middle">共有メンバー</Text>
          </View>

          <View style={styles.divider} />
        </View>
        <ShareUsers onAdd={props.onAddShareUser} />
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
    width: '100%',
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
  share: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme().color.base.main,
    width: '25%',
    marginHorizontal: theme().space(3),
  },
});

export default memo(Authenticated);
