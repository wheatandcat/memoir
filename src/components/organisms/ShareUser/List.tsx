import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import AddButton from 'components/molecules/ShareUser/AddButton';

export type Props = {
  onAdd: () => void;
};

const List: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <View>
        <AddButton onAdd={props.onAdd} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    width: '100%',
    padding: theme().space(3),
  },
});

export default memo(List);
