import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import CategoryButton from 'components/molecules/CategoryButton';
import setting from 'components/atoms/Category/setting';

type Props = {
  categoryID: number | null;
  onPress: (categoryID: number) => void;
};

const Categories: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      {setting().main.map((v) => (
        <View key={v} my={1}>
          <CategoryButton
            categoryID={v}
            selected={v === props.categoryID}
            onPress={() => props.onPress(v)}
          />
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
