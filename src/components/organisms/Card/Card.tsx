import React, { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import theme from 'config/theme';

type Props = {
  title: string;
  onPress: () => void;
};

const Card: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const titleStyle = {
    width: windowWidth - 120,
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.root}>
        <View mx={2}>
          <Image
            source={require('../../../img/categories/book.png')}
            width={50}
            height={50}
          />
        </View>
        <View style={titleStyle}>
          <Text numberOfLines={2} ellipsizeMode="tail" lineHeight={25}>
            {props.title}
          </Text>
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
    height: 75,
    borderColor: theme().category.color.category1,
  },
});
