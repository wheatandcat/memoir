import ErrorPage from "@/components/layouts/Error/Error";
import type { Item, ItemsInPeriodPageInfo } from "@/hooks/useItemsInPeriodPaging";
import type { QueryResult } from "@apollo/client";
import type {
  ItemsInPeriodQuery as Query,
  ItemsInPeriodQueryVariables as Variables,
} from "queries/api/index";
import type React from "react";
import { type FC, memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "loading" | "error">;

export type Props = QueryProps &
  ConnectedType & {
    items: Item[];
    pageInfo: ItemsInPeriodPageInfo;
  };

const Plain: FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && props.items.length === 0 && !props.isFilter) {
    return null;
  }

  return (
    <Page
      startDate={props.startDate}
      endDate={props.endDate}
      loading={props.loading}
      search={props.search}
      items={props.items}
      users={props.users}
      selectedUserIDList={props.selectedUserIDList}
      onLoadMore={props.onLoadMore}
      pageInfo={props.pageInfo}
      onScreenShot={props.onScreenShot}
      onChangeUserID={props.onChangeUserID}
    />
  );
};

export default memo<Props>(Plain);
