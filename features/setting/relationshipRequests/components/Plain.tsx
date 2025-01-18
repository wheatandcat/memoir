import Loading from "@/components/elements/Loading";
import ErrorPage from "@/components/layouts/Error/Error";
import type {
  RelationshipRequest,
  RelationshipRequestsPageInfo,
} from "@/hooks/useRelationshipRequestsPaging";
import type { QueryResult } from "@apollo/client";
import type {
  RelationshipRequestsQuery as Query,
  RelationshipRequestsQueryVariables as Variables,
} from "queries/api/index";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "loading" | "error">;

export type Props = QueryProps &
  ConnectedType & {
    items: RelationshipRequest[];
    pageInfo: RelationshipRequestsPageInfo;
  };

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && props.items.length === 0) {
    return <Loading />;
  }

  return (
    <Page
      items={props.items}
      onLoadMore={props.onLoadMore}
      pageInfo={props.pageInfo}
      loading={props.loading}
      acceptRequesting={props.acceptRequesting}
      ngRequesting={props.ngRequesting}
      onOK={props.onOK}
      onNG={props.onNG}
    />
  );
};

export default memo(Plain);
