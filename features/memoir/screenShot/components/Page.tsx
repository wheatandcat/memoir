import ScreenShot from "@/components/layouts/Memoir/ScreenShot";
import type { Item } from "@/hooks/useItemsInPeriodPaging";
import type React from "react";
import { memo } from "react";
import type { ConnectedType } from "./type";

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
