import React, { memo } from 'react';
import { ConnectedType } from 'components/pages/Memoir/ScreenShot/Connected';
import { Item } from 'hooks/useItemsInPeriodPaging';
import ScreenShot from 'components/organisms/Memoir/ScreenShot';

export type Props = ConnectedType & {
  items: Item[];
};

const Page: React.FC<Props> = (props) => {
  return (
    <ScreenShot
      startDate={props.startDate}
      endDate={props.endDate}
      users={props.users}
      items={props.items}
    />
  );
};

export default memo(Page);
