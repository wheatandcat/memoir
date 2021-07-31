import React, { memo } from 'react';
import Loading from 'components/atoms/Loading';
import TemplateSettingMemoir from 'components/templates/Intro/Intro/Page';
import { State as MemoirNotificationSettingState } from 'hooks/useMemoirNotificationSetting';
import { ConnectedType } from './Connected';

export type Props = ConnectedType & {
  data: MemoirNotificationSettingState;
  loading: boolean;
};

const Plain: React.FC<Props> = (props) => {
  if (props.loading) return <Loading />;

  return (
    <TemplateSettingMemoir
      step={props.step}
      onSaveNotification={props.onSaveNotification}
      dayOfWeek={props.data.dayOfWeek}
      hours={props.data.hours}
      minutes={props.data.minutes}
      notification={props.data.notification}
      onStep={props.onStep}
    />
  );
};

export default memo(Plain);
