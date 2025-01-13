import Loading from "@/components/elements/Loading";
import ErrorPage from "@/components/layouts/Error/Error";
import type { Item } from "@/hooks/useItemsInPeriodPaging";
import type { QueryResult } from "@apollo/client";
import type {
  ItemsInPeriodQuery as Query,
  ItemsInPeriodQueryVariables as Variables,
} from "queries/api/index";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "data" | "loading" | "error">;
export type Props = QueryProps & ConnectedType & {};

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  const items = (props.data?.itemsInPeriod?.edges || []).map(
    (v) => v.node
  ) as Item[];

  return (
    <Page
      startDate={props.startDate}
      endDate={props.endDate}
      items={items}
      users={props.users}
    />
  );
};

export default memo(Plain);
