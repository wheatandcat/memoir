import ErrorPage from "@/components/layouts/Error/Error";
import type { ApolloError } from "@apollo/client";
import type React from "react";
import { memo } from "react";
import Page from "./Page";
import type { ConnectedType } from "./type";

type Props = ConnectedType & {
  loading: boolean;
  error?: ApolloError;
};

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return (
    <Page
      loading={props.loading}
      onDelete={props.onDelete}
      disabledDeleteButton={props.disabledDeleteButton}
    />
  );
};

export default memo(Plain);
