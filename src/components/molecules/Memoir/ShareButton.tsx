import React, { memo } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

type Props = {
  disabled?: boolean;
  onPress: () => void;
};

const ShareButton: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const style = { width: windowWidth };

  if (props.disabled) {
    return (
      <View>
        <View style={[styles.memoirButton, styles.disabledButton, style]}>
          <View>
            <Text color="baseLight">共有する</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <View style={[styles.memoirButton, style]}>
          <View>
            <Text>共有する</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  disabledButton: {
    backgroundColor: theme().color.base.dark,
  },
});
