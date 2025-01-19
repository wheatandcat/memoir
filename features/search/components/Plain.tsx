import Loading from "@/components/elements/Loading";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type Props = ConnectedType & {
  loading: boolean;
};

const Plain: React.FC<Props> = (props) => {
  if (props.loading) return <Loading />;

  return <Page users={props.users} onSearch={props.onSearch} />;
};

export default memo(Plain);
