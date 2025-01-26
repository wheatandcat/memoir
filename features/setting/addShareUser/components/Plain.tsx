import Loading from "@/components/elements/Loading";
import ErrorPage from "@/components/layouts/Error/Error";
import type {
  InviteQuery as Query,
  InviteQueryVariables as Variables,
} from "@/queries/api/index";
import type { QueryResult } from "@apollo/client";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType, Invite } from "./type";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "loading" | "error" | "data">;
type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  const invite = props.data?.invite as Invite;

  if (props.loading && invite?.code === undefined) return <Loading />;

  return <Page invite={invite} {...props} />;
};

export default memo(Plain);
