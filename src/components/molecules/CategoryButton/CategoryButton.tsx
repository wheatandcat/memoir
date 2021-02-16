import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import theme from 'config/theme';
import Image from 'components/atoms/Image';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';

type Props = {
  selected?: boolean;
  name: string;
  onPress: () => void;
};

const CategoryButton: React.FC<Props> = (props) => {
  const style: ViewStyle[] = [styles.image];
  if (props.selected) {
    style.push(styles.selected);
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <View style={style}>
          <Image
            source={require('../../../img/categories/book.png')}
            width={50}
            height={50}
          />
        </View>
        <View style={styles.category}>
          <Text variants="small">{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CategoryButton);

const styles = StyleSheet.create({
  category: {
    borderLeftColor: theme().category.color.category1,
    borderLeftWidth: 8,
    paddingVertical: theme().space(0),
    paddingLeft: theme().space(2),
    marginVertical: theme().space(1),
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: theme().color.background.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: theme().color.primary.light,
  },
});
