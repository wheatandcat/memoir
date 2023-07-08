import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'components/atoms/Image';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import { ConnectedType } from 'components/pages/Intro/Intro/Connected';
import AddButton from 'components/molecules/Home/AddButton';

export type Props = Pick<ConnectedType, 'onFinish'> & {};

const Task: React.FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={theme().color.primary.main} style="dark" />
      <View style={styles.header}>
        <Text textAlign="center">初期設定</Text>
      </View>
      <View style={styles.root}>
        <View style={styles.inner}>
          <View py={5}>
            <Image
              source={require('../../../img/common/intro_06.png')}
              width={95}
              height={95}
              contentFit="contain"
            />
          </View>
          <View mt={2}>
            <Text
              textAlign="center"
              variants="middle"
              lineHeight={35}
              fontFamily="NotoSansJP-Bold"
            >
              準備ができました{'\n'}さっそくタスクを{'\n'}追加してみましょう
            </Text>
          </View>
        </View>
        <View style={styles.addButton}>
          <AddButton onPress={props.onFinish} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme().color.primary.main,
  },
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: theme().color.primary.main,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    paddingVertical: theme().space(3),
    alignItems: 'center',
    height: '45%',
  },
  addButton: {
    paddingTop: theme().space(4),
    width: '100%',
  },
});

export default memo(Task);
