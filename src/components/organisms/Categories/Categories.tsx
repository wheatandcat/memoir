import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import CategoryButton from 'components/molecules/CategoryButton';
import setting from 'components/atoms/Category/setting';

export type Props = {
  categoryID: number | null;
  onPress: (categoryID: number) => void;
};

const Categories: React.FC<Props> = (props) => {
  const category1 = setting().main[0];
  const category2 = setting().main[1];
  const category3 = setting().main[2];

  return (
    <>
      <View style={styles.root}>
        {category1.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
      <View style={styles.root}>
        {category2.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
      <View style={styles.root}>
        {category3.map((v) => (
          <View key={v} my={1}>
            <CategoryButton
              categoryID={v}
              selected={v === props.categoryID}
              onPress={() => props.onPress(v)}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
