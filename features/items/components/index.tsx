import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import { useLocalSearchParams } from "expo-router";
import { type FC, memo } from "react";
import Connected from "./Connected";

const ItemDetail: FC = () => {
	useSentryBreadcrumb();
	const { id, date } = useLocalSearchParams<{ id: string; date: string }>();

	return <Connected date={date} itemID={id} />;
};

export default memo(ItemDetail);
