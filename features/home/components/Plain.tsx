import ErrorPage from "@/components/layouts/Error/Error";
import type { QueryResult } from "@apollo/client";
import type {
  ItemsByDateQuery as Query,
  ItemQueryVariables as Variables,
} from "queries/api/index";
import type { FC } from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "loading" | "error">;

type Props = QueryProps & ConnectedType;

const Plain: FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return <Page {...props} />;
};

export default memo<Props>(Plain);
