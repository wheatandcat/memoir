import React, { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Category from 'components/atoms/Category';
import theme from 'config/theme';
import IconButton from 'components/molecules/IconButton';
import { Item } from 'queries/api/index';
import UserImage from 'components/molecules/User/Image';

type User = {
  id: string;
  displayName: string;
  image: string;
};

export type Props = {
  title: Item['title'];
  categoryID: Item['categoryID'];
  user: User;
  onPress: () => void;
};

const Card: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle: ViewStyle = {
    width: windowWidth - 130,
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.root}>
        <View>
          <Category categoryID={props.categoryID} />
        </View>
        <View pl={3}>
          <View style={[styles.title, titleStyle]}>
            <Text numberOfLines={2} ellipsizeMode="tail" lineHeight={25}>
              {props.title}
            </Text>
          </View>
          <View style={styles.user}>
            <UserImage image={props.user.image} size={20} />
            <View pl={2}>
              <Text variants="small">{props.user?.displayName}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text textAlign="center" size="sm">
            0
          </Text>
          <IconButton
            name="favorite"
            size="base"
            color={theme().color.base.main}
            onPress={() => null}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme().space(2),
  },
  title: {},
  user: {
    paddingVertical: theme().space(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
