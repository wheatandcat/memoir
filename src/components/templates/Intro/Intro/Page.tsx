import React, { memo } from 'react';
import { ConnectedType } from 'components/pages/Intro/Intro/Connected';
import IntroPanel from 'components/organisms/Intro/Intro';

export type Props = ConnectedType & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
  step: number;
};

const Intro: React.FC<Props> = (props) => {
  return (
    <IntroPanel
      dayOfWeek={props.dayOfWeek}
      step={props.step}
      hours={props.hours}
      minutes={props.minutes}
      notification={props.notification}
      onSaveNotification={props.onSaveNotification}
      onStep={props.onStep}
    />
  );
};

export default memo(Intro);
