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
import Image from 'components/atoms/Image';
import { Item } from 'queries/api/index';
import master from 'lib/master';
import setting from 'components/atoms/Category/setting';

type User = {
  id: string;
  name: string;
};

type Props = {
  title: Item['title'];
  categoryID: Item['categoryID'];
  user?: User;
  onPress: () => void;
};

const Card: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle: ViewStyle = {
    width: windowWidth - 120,
  };
  if (props.user) {
    titleStyle.height = 60;
    titleStyle.justifyContent = 'flex-end';
  }

  const rootStyle = { height: 75 };
  if (props.user) {
    rootStyle.height = 95;
  }

  const category = setting().icon.find((v) => v.id === props.categoryID)
    ?.category;

  const categoryStyle: ViewStyle[] = [styles.root, rootStyle];
  switch (category) {
    case master.CATEGORY_1:
      categoryStyle.push(styles.category1);
      break;
    case master.CATEGORY_2:
      categoryStyle.push(styles.category2);
      break;
    case master.CATEGORY_3:
      categoryStyle.push(styles.category3);
      break;
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={categoryStyle}>
        <View mx={2}>
          <Category categoryID={props.categoryID} />
        </View>
        <View>
          <View style={[styles.title, titleStyle]}>
            <Text numberOfLines={2} ellipsizeMode="tail" lineHeight={25}>
              {props.title}
            </Text>
          </View>
          {!!props.user?.id && (
            <View style={styles.user}>
              <Image
                source={require('../../../img/icon/account.png')}
                width={20}
                height={20}
              />
              <View pl={2}>
                <Text variants="small">{props.user?.name}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
  },
  title: {
    paddingLeft: theme().space(0),
  },
  user: {
    paddingVertical: theme().space(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  category1: {
    borderLeftColor: theme().category.color.category1,
  },
  category2: {
    borderLeftColor: theme().category.color.category4,
  },
  category3: {
    borderLeftColor: theme().category.color.category2,
  },
});
