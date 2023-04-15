import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Loading from 'components/atoms/Loading';
import TemplateSettingMemoir from 'components/templates/Intro/Intro/Page';
import { State as MemoirNotificationSettingState } from 'hooks/useMemoirNotificationSetting';
import View from 'components/atoms/View';
import { ConnectedType } from './Connected';

type Props = ConnectedType & {
  data: MemoirNotificationSettingState;
  loading: boolean;
};

const Plain: React.FC<Props> = (props) => {
  if (props.loading)
    return (
      <View style={styles.root}>
        <Loading />
      </View>
    );

  return (
    <TemplateSettingMemoir
      onSaveNotification={props.onSaveNotification}
      dayOfWeek={props.data.dayOfWeek}
      hours={props.data.hours}
      minutes={props.data.minutes}
      notification={props.data.notification}
      onFinish={props.onFinish}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Plain);
