import type React from "react";
import { memo, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "lib/dayjs";
import { type NewItem, CreateItemDocument } from "queries/api/index";
import { useMutation } from "@apollo/client";
import { homeDateState, homeItemsState, homeState } from "store/atoms";
import useHomeItems from "hooks/useHomeItems";
import usePerformance, { traceEvent } from "hooks/usePerformance";
import type { Interaction as SchedulerInteraction } from "scheduler/tracing";
import { useRouter } from "expo-router";
import Plain from "./Plain";

type Props = {
	openSettingModal: boolean;
	onCloseSettingModal: () => void;
};

type State = {
	openAddItemModal: boolean;
};

const initialState = (openAddItemModal: boolean): State => ({
	openAddItemModal,
});

const Connected: React.FC<Props> = (props) => {
	const router = useRouter();
	const home = useRecoilValue(homeState);
	const { onStartTrace, onEndTrace } = usePerformance({
		traceName: traceEvent.TRACE_EVENT_VIEW_HOME_CHANGE_DATE,
	});
	const [addItemLoading, setAddItemLoading] = useState(false);

	const [state, setState] = useState<State>(
		initialState(home.openAddItemModal),
	);
	const [homeDate, setHomeDate] = useRecoilState(homeDateState);

	const homeItems = useRecoilValue(homeItemsState);
	const { loading, error, refetch } = useHomeItems();

	const onOpenAddItem = useCallback(() => {
		setState((s) => ({ ...s, openAddItemModal: true }));
	}, []);

	const onCloseAddItem = useCallback(() => {
		setState((s) => ({ ...s, openAddItemModal: false }));
	}, []);

	const [createItemMutation] = useMutation(CreateItemDocument, {
		async onCompleted() {
			await refetch?.();

			onCloseAddItem();
			setAddItemLoading(false);
		},
		onError() {
			setAddItemLoading(false);
		},
	});

	const onAddItem = useCallback(
		(newItem: NewItem) => {
			const variables = {
				input: newItem,
			};

			setAddItemLoading(true);
			createItemMutation({ variables });
		},
		[createItemMutation],
	);

	const onChangeDate = useCallback(
		(date: string) => {
			onStartTrace(1500);

			setHomeDate({
				date: dayjs(date).format("YYYY-MM-DDT00:00:00+09:00"),
			});
		},
		[setHomeDate, onStartTrace],
	);

	const onItem = useCallback(
		(itemID: string) => {
			router.push(`/items/${itemID}?date=${dayjs(homeDate.date).format("YYYY-MM-DD")}`);
		},
		[router, homeDate.date],
	);

	const onMemoir = useCallback(() => {
		router.push("/memoir");

		/*
      startDate: dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00'),
      endDate: dayjs().format('YYYY-MM-DDT00:00:00+09:00'),
    */
	}, [router]);

	const onRender = useCallback(
		(
			id: string,
			_: "mount" | "update",
			actualDuration: number,
			baseDuration: number,
			startTime: number,
			commitTime: number,
			interactions: Set<SchedulerInteraction>,
		) => {
			const data = {
				id,
				actualDuration,
				baseDuration,
				startTime,
				commitTime,
				interactions,
			};

			onEndTrace(data);
		},
		[onEndTrace],
	);

	return (
		<Plain
			items={homeItems.items}
			loading={loading}
			error={error}
			addItemLoading={addItemLoading}
			date={dayjs(homeDate.date).format("YYYY-MM-DD")}
			openAddItemModal={state.openAddItemModal}
			openSettingModal={props.openSettingModal}
			onAddItem={onAddItem}
			onChangeDate={onChangeDate}
			onCloseAddItem={onCloseAddItem}
			onCloseSettingModal={props.onCloseSettingModal}
			onItem={onItem}
			onMemoir={onMemoir}
			onOpenAddItem={onOpenAddItem}
		/>
	);
};

export default memo(Connected);
