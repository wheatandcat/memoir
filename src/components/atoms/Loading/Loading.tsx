import React from 'react';
import { ActivityIndicator } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';

type Props = {
  size?: 'small' | 'large';
};

const Loading: React.FC<Props> = (props) => {
  return (
    <View m={4}>
      <ActivityIndicator
        size={props.size}
        color={theme().color.secondary.light}
        testID="atoms_loading"
      />
    </View>
  );
};

Loading.defaultProps = {
  size: 'large',
};

export default Loading;
