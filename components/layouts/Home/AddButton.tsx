import  { memo, type FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from '@/components/elements/View';
import { MaterialIcons } from '@expo/vector-icons';
import theme from 'config/theme';

type Props = {
  onPress: () => void;
};

const AddButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View px={3} py={3}>
        <View style={styles.addButton}>
          <MaterialIcons name="add" size={56} color={theme().color.base.dark} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AddButton);

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme().color.base.main,
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
