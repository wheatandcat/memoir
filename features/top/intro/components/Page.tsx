import type { ConnectedType } from "@/features/top/intro/components/Connected";
import IntroPanel from "@/features/top/intro/components/Panel";
import { type FC, memo } from "react";

export type Props = ConnectedType & {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const Intro: FC<Props> = (props) => {
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
