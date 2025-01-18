import Text from '@/components/elements/Text';
import View from '@/components/elements/View';
import UserImage from '@/components/layouts/User/Image';
import type { ConnectedType } from 'components/pages/MyPage/Connected';
import theme from 'config/theme';
import  { type FC, memo, useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import type { User as UserType } from 'store/atoms';

export type Props = {
  loading: boolean;
  user: UserType;
  onDeleteRelationship: ConnectedType['onDeleteRelationship'];
};

const User: FC<Props> = (props) => {
  const onDelete = useCallback(() => {
    Alert.alert('共有メンバーを解除しますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '解除する',
        onPress: () => {
          props.onDeleteRelationship(props.user.id || '');
        },
      },
    ]);
  }, [props]);

  return (
    <View style={styles.root}>
      <View>
        <UserImage image={props.user?.image || ''} size={100} />
      </View>
      <View>
        <View my={2}>
          <Text textAlign="center">{props.user?.displayName || ''}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (props.loading) {
              return;
            }

            onDelete();
          }}
        >
          <Text size="xs" textAlign="center">
            解除
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme().space(3),
    width: 110,
  },
});

export default memo(User);
