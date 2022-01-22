import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import { User } from 'queries/api/index';
import UserImage from 'components/molecules/User/Image';

export type Props = {
  user: Pick<User, 'id' | 'image'>;
  selected: boolean;
  onAdd: (id: User['id']) => void;
  onRemove: (id: User['id']) => void;
  size?: number;
};

const Users: React.FC<Props> = (props) => {
  if (props.selected) {
    return (
      <View m={2}>
        <TouchableOpacity onPress={() => props.onRemove(props.user.id)}>
          <UserImage size={props.size} image={props.user.image} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View m={2} style={styles.clear}>
      <TouchableOpacity onPress={() => props.onAdd(props.user.id)}>
        <UserImage size={props.size} image={props.user.image} />
      </TouchableOpacity>
    </View>
  );
};

Users.defaultProps = {
  size: 70,
};

export default memo(Users);

const styles = StyleSheet.create({
  clear: {
    opacity: 0.4,
  },
});
