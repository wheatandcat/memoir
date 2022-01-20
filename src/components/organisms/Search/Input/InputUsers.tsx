import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import UserImage from 'components/molecules/User/Image';
import { User } from 'store/atoms';

export type Props = {
  users: Omit<User, 'userID'>[];
};
const InputUsers: React.FC<Props> = (props) => {
  return (
    <View style={styles.users}>
      {props.users.map((v) => (
        <View px={3}>
          <UserImage image={v.image} size={50} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  users: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(InputUsers);
