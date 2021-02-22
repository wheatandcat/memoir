import React, { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

type Props = {
  onPress: () => void;
};

const ShareButton: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const style = { width: windowWidth };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <View style={[styles.memoirButton, style]}>
          <View>
            <Text>共有する</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ShareButton);

const styles = StyleSheet.create({
  memoirButton: {
    backgroundColor: theme().color.primary.main,
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
