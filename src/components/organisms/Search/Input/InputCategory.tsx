import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import setting from 'components/atoms/Category/setting';
import CategoryButton from 'components/molecules/CategoryButton';

export type Props = {};

const InputCategory: React.FC<Props> = () => {
  const category1 = setting().main[0];
  const category2 = setting().main[1];
  const category3 = setting().main[2];

  return (
    <>
      <View style={styles.category}>
        {category1.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category2.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
      <View style={styles.category}>
        {category3.map((v) => (
          <View key={v} mx={2}>
            <CategoryButton
              categoryID={v}
              selected={false}
              opacity
              onPress={() => null}
              displayName={false}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(InputCategory);
