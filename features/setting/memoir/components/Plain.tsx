import Loading from "@/components/elements/Loading";
import type { State as MemoirNotificationSettingState } from "@/hooks/useMemoirNotificationSetting";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type Props = ConnectedType & {
  data: MemoirNotificationSettingState;
  loading: boolean;
};

const Plain: React.FC<Props> = (props) => {
  if (props.loading) return <Loading />;

  return (
    <Page
      onSave={props.onSave}
      dayOfWeek={props.data.dayOfWeek}
      hours={props.data.hours}
      minutes={props.data.minutes}
      notification={props.data.notification}
    />
  );
};

export default memo(Plain);
