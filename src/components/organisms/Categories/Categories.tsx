import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import CategoryButton from 'components/molecules/CategoryButton';

type Props = {
  selected?: boolean;
  onPress: () => void;
};

const categoryItems = [
  {
    id: 1,
    name: '趣味',
  },
  {
    id: 2,
    name: '家事',
  },
  {
    id: 3,
    name: '仕事',
  },
  {
    id: 4,
    name: '趣味',
  },
  {
    id: 5,
    name: '家事',
  },
  {
    id: 6,
    name: '仕事',
  },
  {
    id: 7,
    name: '趣味',
  },
  {
    id: 8,
    name: '家事',
  },
  {
    id: 9,
    name: '仕事',
  },
];

const Categories: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      {categoryItems.map((v) => (
        <View key={v.id} my={1}>
          <CategoryButton name={v.name} onPress={props.onPress} />
        </View>
      ))}
    </View>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
