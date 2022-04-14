import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import View from 'components/atoms/View';
import { User } from 'queries/api/index';
import UserButton, {
  Props as UserButtonProps,
} from 'components/molecules/User/Button';

export type Props = {
  users: Pick<User, 'id' | 'image'>[];
  userIDList: string[];
} & Pick<UserButtonProps, 'onAdd' | 'onRemove'>;

const InputUsers: React.FC<Props> = (props) => {
  const style: ViewStyle[] = [styles.users];
  if (props.users.length > 3) {
    style.push(styles.userMulti);
  }

  return (
    <View style={style}>
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
