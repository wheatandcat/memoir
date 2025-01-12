import { type FC, memo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import View from '@/components/elements/View';
import type { User } from 'queries/api/index';
import UserButton, {
  type Props as UserButtonProps,
} from '@/components/layouts/User/Button';

export type Props = {
  users: Pick<User, 'id' | 'image'>[];
  userIDList: string[];
} & Pick<UserButtonProps, 'onAdd' | 'onRemove'>;

const InputUsers: FC<Props> = (props) => {
  const style: ViewStyle[] = [styles.users];
  if (props.users.length > 3) {
    style.push(styles.userMulti);
  }

  return (
    <View style={style} testID="input-users">
      {props.users.map((v) => (
        <View px={3} key={v.id}>
          <UserButton
            user={v}
            size={50}
            selected={!!props.userIDList.find((v1) => v1 === v.id)}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  users: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userMulti: { width: '80%' },
});

export default memo(InputUsers);
