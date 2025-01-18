import Loading from "@/components/elements/Loading";
import View from "@/components/elements/View";
import type { State as MemoirNotificationSettingState } from "@/hooks/useMemoirNotificationSetting";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";
import type { ConnectedType } from "./Connected";
import Page from "./Page";

type Props = ConnectedType & {
	data: MemoirNotificationSettingState;
	loading: boolean;
};

const Plain: FC<Props> = (props) => {
	if (props.loading)
		return (
			<View style={styles.root}>
				<Loading />
			</View>
		);

	return (
		<Page
			onSaveNotification={props.onSaveNotification}
			dayOfWeek={props.data.dayOfWeek}
			hours={props.data.hours}
			minutes={props.data.minutes}
			notification={props.data.notification}
			onFinish={props.onFinish}
		/>
	);
};

const styles = StyleSheet.create({
	root: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default memo(Plain);
