import type { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';

type Props = {
  size?: 'small' | 'large';
};

const Loading: FC<Props> = ({ size = 'large' }) => {
  return (
    <View m={4}>
      <ActivityIndicator
        size={size}
        color={theme().color.secondary.light}
        testID="atoms_loading"
      />
    </View>
  );
};

export default Loading;
