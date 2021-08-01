import React, { memo } from 'react';
import { ConnectedType } from 'components/pages/Intro/Intro/Connected';
import IntroPanel from 'components/organisms/Intro/Intro';

export type Props = ConnectedType & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Intro: React.FC<Props> = (props) => {
  return (
    <IntroPanel
      dayOfWeek={props.dayOfWeek}
      hours={props.hours}
      minutes={props.minutes}
      notification={props.notification}
      onSaveNotification={props.onSaveNotification}
      onFinish={props.onFinish}
    />
  );
};

export default memo(Intro);
