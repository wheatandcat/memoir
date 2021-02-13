import React from 'react';
import { TouchableOpacity } from 'react-native';
import theme from 'config/theme';
import { MaterialIcons } from '@expo/vector-icons';

type Name = 'more-vert' | 'close';

type Props = {
  name: Name;
  size?: 'sm' | 'base' | 'lg';
  onPress: () => void;
};

const IconButton: React.FC<Props> = (props) => {
  const size = theme().icon.size[props.size || 'base'];

  return (
    <TouchableOpacity onPress={props.onPress}>
      <MaterialIcons
        name={props.name}
        size={size}
        color={theme().color.secondary.main}
      />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  size: 'base',
};

export default IconButton;
