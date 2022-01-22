import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
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
  return (
    <View style={styles.users}>
      {props.users.map((v) => (
        <View px={3}>
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
  },
});

export default memo(InputUsers);
