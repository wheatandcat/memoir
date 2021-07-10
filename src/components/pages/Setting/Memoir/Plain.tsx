import React, { memo } from 'react';
import Loading from 'components/atoms/Loading';
import TemplateSettingMemoir from 'components/templates/Setting/Memoir/Page';
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
      onSave={props.onSave}
      dayOfWeek={props.data.dayOfWeek}
      hours={props.data.hours}
      minutes={props.data.minutes}
      notification={props.data.notification}
    />
  );
};

export default memo(Plain);
