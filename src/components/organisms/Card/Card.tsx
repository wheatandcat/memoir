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

type User = {
  id: string;
  name: string;
};

type Props = {
  title: string;
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

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.root, rootStyle]}>
        <View mx={2}>
          <Category categoryID={2} />
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
    borderColor: theme().category.color.category1,
  },
  title: {
    paddingLeft: theme().space(0),
  },
  user: {
    paddingVertical: theme().space(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
