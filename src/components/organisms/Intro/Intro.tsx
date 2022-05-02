import React, { memo, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import IntroCard from 'components/molecules/Intro/Card';
import { ConnectedType } from 'components/pages/Intro/Intro/Connected';
import Notification from 'components/organisms/Intro/Notification';
import Task from 'components/organisms/Intro/Task';
import { useNotification } from 'containers/Notification';

export type Props = ConnectedType & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Intro: React.FC<Props> = (props) => {
  const { onPermissionRequest } = useNotification();
  const scrollViewRef = useRef<ScrollView>(null);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [page, setPage] = useState(0);

  const style: ViewStyle[] = [{ width, height }];

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { x } = event.nativeEvent.contentOffset;
      const nextPage = Math.floor(x / width);
      if (nextPage > 5) {
        props.onFinish();
      } else if (nextPage !== page) {
        setPage(nextPage);
      }
    },
    [page, width, props]
  );

  const onSkip = useCallback(() => {
    onPermissionRequest?.(() => {
      props.onFinish();
    });
  }, [props, onPermissionRequest]);

  const onNext = useCallback(() => {
    if (page > 5) {
      props.onFinish();
    } else {
      const nextPage = page + 1;
      scrollViewRef?.current?.scrollTo?.({
        x: width * nextPage,
        y: 0,
        animated: true,
      });
      setPage(nextPage);
    }
  }, [width, page, props]);

  return (
    <>
      <StatusBar backgroundColor={theme().color.primary.main} style="dark" />
      <View style={styles.wrap}>
        <ScrollView
          style={styles.wrap}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          ref={scrollViewRef}
        >
          <ImageBackground
            source={require('../../../img/common/frame.png')}
            resizeMode="cover"
            style={[styles.image, style]}
          >
            <IntroCard
              source={require('../../../img/common/intro_01.png')}
              text={'記録する\nふりかえる\n共有する'}
              onNext={onNext}
            />
          </ImageBackground>

          <ImageBackground
            source={require('../../../img/common/frame.png')}
            resizeMode="cover"
            style={[styles.image, style]}
          >
            <IntroCard
              source={require('../../../img/common/intro_02.png')}
              text={'memoirは\nタスクを記録して\n'}
              onNext={onNext}
            />
          </ImageBackground>

          <ImageBackground
            source={require('../../../img/common/frame.png')}
            resizeMode="cover"
            style={[styles.image, style]}
          >
            <IntroCard
              source={require('../../../img/common/intro_03.png')}
              text={'定期的に\n「ふりかえる」\nアプリです'}
              onNext={onNext}
            />
          </ImageBackground>

          <ImageBackground
            source={require('../../../img/common/frame.png')}
            resizeMode="cover"
            style={[styles.image, style]}
          >
            <IntroCard
              source={require('../../../img/common/intro_04.png')}
              text={'まずは\n初期設定を\nしてください'}
              onNext={onNext}
            />
          </ImageBackground>
          <View style={style}>
            <Notification
              dayOfWeek={props.dayOfWeek}
              hours={props.hours}
              minutes={props.minutes}
              notification={props.notification}
              onSaveNotification={props.onSaveNotification}
              onNext={onNext}
            />
          </View>
          <View style={style}>
            <Task onFinish={props.onFinish} />
          </View>
        </ScrollView>

        <SafeAreaView style={styles.skip}>
          <TouchableWithoutFeedback onPress={onSkip}>
            <Text fontWeight="bold">SKIP</Text>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
    height: '100%',
    backgroundColor: theme().color.primary.main,
  },
  image: {
    justifyContent: 'center',
    height: '100%',
  },
  skip: {
    position: 'absolute',
    top: theme().space(3),
    right: theme().space(3),
  },
});

export default memo(Intro);
