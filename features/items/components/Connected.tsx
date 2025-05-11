import useHomeItems from "@/hooks/useHomeItems";
import dayjs from "@/lib/dayjs";
import type { DeleteItem, NewItem, UpdateItem } from "@/queries/api/index";
import {
  DeleteItemDocument,
  ItemDocument,
  UpdateItemDocument,
} from "@/queries/api/index";
import { useHomeDateStore } from "@/store/homeDateStore";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import Plain from "./Plain";

export type Props = {
  itemID: string;
  date: string;
};

type State = {
  openUpdateItemModal: boolean;
};

const initialState = (): State => ({
  openUpdateItemModal: false,
});

const Connected: FC<Props> = (props) => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState());
  const [updateItemLoading, setUpdateItemLoading] = useState(false);
  const { setHomeDate } = useHomeDateStore();
  const homeItems = useHomeItems();

  const { loading, data, error, refetch } = useQuery(ItemDocument, {
    variables: {
      id: props.itemID,
    },
  });

  const onOpenUpdateItem = useCallback(() => {
    setState((s) => ({ ...s, openUpdateItemModal: true }));
  }, []);

  const onCloseUpdateItem = useCallback(() => {
    setState((s) => ({ ...s, openUpdateItemModal: false }));
  }, []);

  const [updateItemMutation] = useMutation(UpdateItemDocument, {
    async onCompleted({ updateItem }) {
      await refetch?.();

      if (updateItem.date !== props.date) {
        // 日付を更新した場合は、変更後と変更前の日付のアイテムのキャッシュを削除する
        const cache = homeItems?.client?.cache;
        if (cache) {
          cache.evict({
            id: "ROOT_QUERY",
            fieldName: "itemsByDate",
            args: {
              date: props.date,
            },
            broadcast: false,
          });
          cache.evict({
            id: "ROOT_QUERY",
            fieldName: "itemsByDate",
            args: {
              date: updateItem.date,
            },
            broadcast: false,
          });
          cache.gc();

          homeItems?.refetch?.();
        }
      }

      onCloseUpdateItem();
      setUpdateItemLoading(false);
    },
    onError() {
      setUpdateItemLoading(false);
    },
  });

  const onUpdateItem = useCallback(
    (newItem: NewItem) => {
      const updateItem: UpdateItem = {
        id: props.itemID,
        ...newItem,
      };

      const variables = {
        input: updateItem,
      };

      setUpdateItemLoading(true);
      updateItemMutation({ variables });
    },
    [updateItemMutation, props.itemID]
  );

  const [deleteItemMutation] = useMutation(DeleteItemDocument, {
    async onCompleted() {
      await homeItems?.refetch?.();
      router.back();
    },
  });

  const onDeleteItem = useCallback(() => {
    const deleteItem: DeleteItem = {
      id: props.itemID,
    };
    const variables = {
      input: deleteItem,
    };

    deleteItemMutation({ variables });
  }, [props.itemID, deleteItemMutation]);

  const onChangeDate = useCallback(
    (date: string) => {
      setHomeDate(dayjs(date).format("YYYY-MM-DDT00:00:00+09:00"));

      router.back();
    },
    [router, setHomeDate]
  );

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      updateItemLoading={updateItemLoading}
      date={dayjs(props.date).format("YYYY-MM-DD")}
      openUpdateItemModal={state.openUpdateItemModal}
      onChangeDate={onChangeDate}
      onOpenUpdateItem={onOpenUpdateItem}
      onUpdateItem={onUpdateItem}
      onDeleteItem={onDeleteItem}
      onCloseUpdateItem={onCloseUpdateItem}
    />
  );
};

export default memo(Connected);
