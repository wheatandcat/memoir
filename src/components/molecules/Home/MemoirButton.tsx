import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Image from 'components/atoms/Image';
import theme from 'config/theme';

type Props = {
  onPress: () => void;
};

const MemoirButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <View style={styles.memoirButton}>
          <View>
            <Image
              source={require('../../../img/icon/main.png')}
              width={30}
              height={30}
            />
          </View>
          <View>
            <Text>今週のmemoirを確認する</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MemoirButton);

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
