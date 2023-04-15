import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { MaterialIcons } from '@expo/vector-icons';

export type Props = {
  onAdd: () => void;
};

const AddButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onAdd} testID="add-button">
      <View style={styles.addButton}>
        <MaterialIcons name="add" size={50} color={theme().color.base.dark} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme().color.base.main,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(AddButton);
