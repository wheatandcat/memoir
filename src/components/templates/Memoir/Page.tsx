import React, { memo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import View from 'components/atoms/View';
import DateCards from 'components/organisms/Memoir/DateCards';
import theme from 'config/theme';
import ShareButton from 'components/molecules/Memoir/ShareButton';
import { Props as PlainProps } from 'components/pages/Memoir/Plain';
import IconButton from 'components/molecules/IconButton';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import { iosSelector } from 'lib/responsive';

export type Props = Pick<
  PlainProps,
  | 'items'
  | 'loading'
  | 'onLoadMore'
  | 'onItem'
  | 'pageInfo'
  | 'users'
  | 'search'
  | 'selectedUserIDList'
  | 'onScreenShot'
  | 'onChangeUserID'
> & {
  startDate: string;
  endDate: string;
};

const Page: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={theme().color.background.main}
        style="dark"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.root}>
          <View style={styles.inner}>
            <DateCards
              startDate={props.startDate}
              endDate={props.endDate}
              items={props.items}
              pageInfo={props.pageInfo}
              loading={props.loading}
              onItem={props.onItem}
              onLoadMore={props.onLoadMore}
              users={props.users}
              search={props.search}
              selectedUserIDList={props.selectedUserIDList}
              onChangeUserID={props.onChangeUserID}
            />
          </View>
          <View style={styles.action}>
            <ShareButton
              onPress={props.onScreenShot}
              disabled={props.items.length === 0}
            />
          </View>
          <View style={styles.close}>
            <IconButton
              name="highlight-off"
              size="base"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    position: 'relative',
    flex: 1,
  },
  root: {
    height: '100%',
    backgroundColor: theme().color.background.main,
  },
  inner: {
    height: '100%',
  },
  action: {
    bottom: iosSelector({ iPhone8: 30, other: 0 }),
    height: Platform.OS === 'ios' ? 22 : 55,
    position: 'absolute',
  },
  close: {
    position: 'absolute',
    top: 0,
    left: theme().space(2),
    backgroundColor: theme().color.background.main,
    borderRadius: 25,
  },
});

export default memo(Page);
