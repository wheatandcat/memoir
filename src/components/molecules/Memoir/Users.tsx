import React, { memo, useCallback } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { User } from 'queries/api/index';
import UserImage from 'components/molecules/User/Image';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';

type Users = Pick<User, 'id' | 'image'>[];

export type Props = {
  users: Users;
  selectedUserIDList: PlainProps['selectedUserIDList'];
  onChangeUserID: PlainProps['onChangeUserID'];
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

  return (
    <ScrollView style={styles.wrap} horizontal>
      <View style={styles.root}>
        {props.users.map((v) => {
          const selected = props.selectedUserIDList.find((uid) => v.id === uid);

          if (selected) {
            if (props.selectedUserIDList.length === 1) {
              return (
                <View key={v.id} m={2}>
                  <UserImage size={70} image={v.image} />
                </View>
              );
            }

            return (
              <View key={v.id} m={2}>
                <TouchableOpacity onPress={() => onRemove(v.id)}>
                  <UserImage size={70} image={v.image} />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View key={v.id} m={2} style={styles.clear}>
              <TouchableOpacity onPress={() => onAdd(v.id)}>
                <UserImage size={70} image={v.image} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    flexDirection: 'row',
    marginLeft: theme().space(4),
  },
  wrap: {
    flex: 1,
  },
  clear: {
    opacity: 0.4,
  },
});

export default memo(Users);
