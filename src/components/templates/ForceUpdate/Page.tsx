import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import AppLink from 'react-native-app-link';
import Button from 'components/atoms/Button';

export type Props = {};
const appStoreId = 1613532672;
const playStoreId = 'com.wheatandcat.memoir';

const Page: React.FC<Props> = () => {
  const onPress = useCallback(() => {
    AppLink.openInStore({
      appName: 'memoir',
      appStoreId,
      appStoreLocale: 'jp',
      playStoreId,
    });
  }, []);

  return (
    <View style={styles.root}>
      <View py={5} mx={3}>
        <Text lineHeight={30}>
          新しいバージョンがリリースされました。{'\n'}
          ストアからアプリのバージョンアップをして下さい。
        </Text>
      </View>

      <Button title="ストアへ" width={250} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    padding: theme().space(3),
    height: '100%',
    alignItems: 'center',
  },
});

export default memo(Page);
