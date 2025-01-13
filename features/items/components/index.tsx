import { memo, type FC } from "react";
import useSentryBreadcrumb from "hooks/useSentryBreadcrumb";
import { useLocalSearchParams } from "expo-router";
import Connected from "./Connected";

const ItemDetail: FC = () => {
	useSentryBreadcrumb();
	const { id, date } = useLocalSearchParams<{ id: string; date: string }>();

	return <Connected date={date} itemID={id} />;
};

export default memo(ItemDetail);
