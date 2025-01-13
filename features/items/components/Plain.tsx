import { memo, type FC } from "react";
import type {
	ItemQuery as Query,
	ItemQueryVariables as Variables,
} from "queries/api/index";
import ErrorPage from "@/components/layouts/Error/Error";
import type { QueryResult } from "@apollo/client";
import type { ConnectedType } from "./type";
import Page from "./Page";

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, "data" | "loading" | "error">;

type Props = QueryProps & ConnectedType;

const Plain: FC<Props> = (props) => {
	if (props.error) return <ErrorPage error={props.error} />;

	const item = props.data?.item;

	return (
		<Page
			{...props}
			title={item?.title || ""}
			categoryID={item?.categoryID || 0}
			like={item?.like || false}
			dislike={item?.dislike || false}
			itemDate={item?.date || ""}
		/>
	);
};

export default memo<Props>(Plain);
