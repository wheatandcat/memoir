import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Card from 'components/organisms/Card';
import AddButton from 'components/molecules/Home/AddButton';

type Props = {
  onItem: () => void;
  onAddItem: () => void;
};

const items = [
  {
    title: '本読んだ',
  },
  {
    title:
      '「とても長いタイトルの本」を読んだんだけど、もっと長いタイトルの本です',
  },
];

const Cards: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <AddButton onPress={props.onAddItem} />
      <View>
        {items.map((v) => (
          <View key={v.title} mb={3} mx={3}>
            <Card title={v.title} onPress={props.onItem} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(Cards);

const styles = StyleSheet.create({
  root: {},
});
