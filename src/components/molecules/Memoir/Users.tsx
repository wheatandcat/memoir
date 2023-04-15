import React, { memo, useCallback } from 'react';
import { StyleSheet, ScrollView, ViewStyle } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { User } from 'queries/api/index';
import UserImage from 'components/molecules/User/Image';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';
import UserButton from 'components/molecules/User/Button';

type Users = Pick<User, 'id' | 'image'>[];

export type Props = {
  users: Users;
  selectedUserIDList: PlainProps['selectedUserIDList'];
  onChangeUserID: PlainProps['onChangeUserID'];
  center?: boolean;
  size?: number;
};

const Users: React.FC<Props> = (props) => {
  const onAdd = useCallback(
    (uid: string) => {
      const userIDList = [...props.selectedUserIDList, uid];
      props.onChangeUserID(userIDList);
    },
    [props]
  );

  const onRemove = useCallback(
    (uid: string) => {
      const userIDList = props.selectedUserIDList.filter((v) => v !== uid);
      props.onChangeUserID(userIDList);
    },
    [props]
  );

  const style: ViewStyle[] = [styles.root];

  if (!props.center) {
    style.push(styles.left);
  }

  return (
    <ScrollView style={styles.wrap} horizontal testID="memoir-users">
      <View style={style}>
        {props.users.map((v) => {
          const selected = !!props.selectedUserIDList.find(
            (uid) => v.id === uid
          );

          if (selected) {
            if (props.selectedUserIDList.length === 1) {
              return (
                <View key={v.id} m={2}>
                  <UserImage size={props.size} image={v.image} />
                </View>
              );
            }
          }

          return (
            <UserButton
              key={v.id}
              user={v}
              selected={selected}
              size={props.size}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

Users.defaultProps = {
  center: false,
  size: 70,
};

export default memo(Users);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  left: {
    marginLeft: theme().space(4),
  },
  wrap: {
    flex: 1,
  },
});
