import { memo, type FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from '@/components/elements/View';
import Text from '@/components/elements/Text';
import Image from '@/components/elements/Image';
import theme from 'config/theme';

type Props = {
  onPress: () => void;
};

const MemoirButton: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.memoirButton}>
          <View>
            <Image
              source={require('@/src/img/icon/main.png')}
              width={30}
              height={30}
            />
          </View>
          <View>
            <Text>今週のmemoirを確認する</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MemoirButton);

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  memoirButton: {
    backgroundColor: theme().color.primary.main,
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
