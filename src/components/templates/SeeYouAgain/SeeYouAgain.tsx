import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import { useSetRecoilState } from 'recoil';
import { screenState } from 'store/atoms';

export type Props = {};

const SeeYouAgain: React.FC<Props> = () => {
  const setScreenState = useSetRecoilState(screenState);

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <ScrollView>
          <View style={styles.inner}>
            <View pt={4} pb={5}>
              <Image
                source={require('../../../img/icon/trust.png')}
                width={100}
                height={100}
                contentFit="contain"
              />
            </View>
            <Text size="base">
              アカウント削除が完了しました。{'\n\n'}
              ご利用ありがとうございました。{'\n\n'}また、会いましょう。
            </Text>
            <View py={5}>
              <Button
                title="TOPに戻る"
                onPress={() => {
                  setScreenState({ seeYouAgain: false });
                }}
                width={200}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    height: '100%',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: theme().space(2),
    marginBottom: theme().space(6),
  },
});

export default memo(SeeYouAgain);
