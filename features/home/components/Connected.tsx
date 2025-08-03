import View from "@/components/elements/View";
import useHomeItems from "@/hooks/useHomeItems";
import dayjs from "@/lib/dayjs";
import { CreateItemDocument } from "@/queries/api/index";
import type { NewItem } from "@/queries/api/index";
import { useHomeDateStore } from "@/store/homeDateStore";
import { useHomeItemsStore } from "@/store/homeItemsStore";
import { useHomeStateStore } from "@/store/homeStateStore";
import { useMutation } from "@apollo/client";
import { useRouter } from "expo-router";
import type React from "react";
import { memo, useCallback, useState } from "react";
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
  const home = useHomeStateStore((state) => state.homeState);
  const [addItemLoading, setAddItemLoading] = useState(false);

  const [state, setState] = useState<State>(
    initialState(home.openAddItemModal),
  );
  const { homeDate, setHomeDate } = useHomeDateStore();

  const homeItems = useHomeItemsStore((state) => state.homeItems);
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
      setHomeDate(dayjs(date).format("YYYY-MM-DDT00:00:00+09:00"));
    },
    [setHomeDate],
  );

  const onItem = useCallback(
    (itemID: string) => {
      const date = dayjs(homeDate.date).format("YYYY-MM-DD");
      router.push({
        pathname: "/items/[id]",
        params: {
          id: itemID,
          date,
        },
      });
    },
    [router, homeDate.date],
  );

  const onMemoir = useCallback(() => {
    const startDate = dayjs()
      .add(-6, "day")
      .format("YYYY-MM-DDT00:00:00+09:00");
    const endDate = dayjs().format("YYYY-MM-DDT00:00:00+09:00");

    router.push({
      pathname: "/modal",
      params: {
        startDate,
        endDate,
      },
    });
  }, [router]);

  return (
    <View>
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
    </View>
  );
};

export default memo(Connected);
