import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import View from '@/components/elements/View';
import UserImage from '@/components/layouts/User/Image';
import { MaterialIcons } from '@expo/vector-icons';
import type { ConnectedType } from 'components/pages/MyPage/Connected';
import theme from 'config/theme';
import { type FC, memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { User } from 'store/atoms';

export type Props = {
  user: User;
  onLogin: () => void;
} & Pick<ConnectedType, 'onUpdateProfile'>;

const NotAuthenticated: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <View mt={4}>
          <TouchableOpacity onPress={props.onUpdateProfile}>
            <UserImage image={props.user.image} />
          </TouchableOpacity>
        </View>
        <View m={4}>
          <TouchableOpacity onPress={props.onUpdateProfile}>
            <View style={styles.userInfo}>
              <Text>
                {props.user?.displayName || '表示名の設定がありません'}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={23}
                color={theme().color.secondary.main}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View m={3} style={styles.action}>
        <View my={4} style={styles.text}>
          <Text variants="small" textAlign="center" lineHeight={15}>
            サインインすれば、他のユーザーとタスクを共有することができます。
          </Text>
        </View>
        <View>
          <Button title="サインイン" onPress={props.onLogin} width={220} />
        </View>
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
  user: {
    width: '100%',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: 250,
  },
});

export default memo(NotAuthenticated);
