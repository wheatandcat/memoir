import React, { memo } from 'react';
import { TouchableWithoutFeedback, StyleSheet, ViewStyle } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Category from 'components/atoms/Category';
import { icon } from 'components/atoms/Category/setting';
import { categoryBorderStyle } from 'lib/category';

type Props = {
  categoryID: number;
  selected?: boolean;
  onPress: () => void;
};

const CategoryButton: React.FC<Props> = (props) => {
  const style: ViewStyle[] = [styles.image];
  if (props.selected) {
    style.push(styles.selected);
  }

  const s = icon(props.categoryID);

  const categoryStyle: ViewStyle[] = [
    styles.category,
    categoryBorderStyle(s.category || 0),
  ];

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <View style={style}>
          <Category categoryID={props.categoryID} />
        </View>
        <View style={categoryStyle}>
          <Text variants="small">{s.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CategoryButton);

const styles = StyleSheet.create({
  category: {
    borderLeftWidth: 8,
    paddingVertical: theme().space(0),
    paddingLeft: theme().space(2),
    marginVertical: theme().space(1),
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  selected: {
    backgroundColor: theme().color.primary.light,
  },
});
