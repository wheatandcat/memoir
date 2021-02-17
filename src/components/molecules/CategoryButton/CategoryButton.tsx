import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Category from 'components/atoms/Category';
import { icon } from 'components/atoms/Category/setting';
import master from 'lib/master';

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

  const categoryStyle: ViewStyle[] = [styles.category];
  switch (s.category) {
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
      <View>
        <View style={style}>
          <Category categoryID={props.categoryID} />
        </View>
        <View style={categoryStyle}>
          <Text variants="small">{s.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  category1: {
    borderLeftColor: theme().category.color.category1,
  },
  category2: {
    borderLeftColor: theme().category.color.category4,
  },
  category3: {
    borderLeftColor: theme().category.color.category2,
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
