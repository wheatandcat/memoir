import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import View from 'components/atoms/View';
import Text, { FontFamily } from 'components/atoms/Text';
import theme from 'config/theme';

type Props = {
  title: string;
  divider?: boolean;
  fontFamily?: FontFamily;
  onPress: () => void;
};

const ListItem: React.FC<Props> = (props) => {
  const style: ViewStyle = {};

  if (props.divider) {
    style.borderBottomWidth = StyleSheet.hairlineWidth;
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.root, style]}>
        <View>
          <Text>{props.title}</Text>
        </View>
        <View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={theme().color.secondary.main}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.main,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme().space(3),
  },
});

ListItem.defaultProps = {
  divider: false,
  fontFamily: 'RobotoCondensed-Bold',
};

export default ListItem;
