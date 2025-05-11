import { useSession } from "@/ctx";
import usePrevious from "@/hooks/usePrevious";
import { ItemsByDateDocument } from "@/queries/api/index";
import { homeItemsState } from "@/store/atoms";
import { useHomeDateStore } from "@/store/homeDateStore";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const useHomeItems = () => {
  const { signOut } = useSession();

  const [getItemsByDate, { data, loading, error, refetch, client }] =
    useLazyQuery(ItemsByDateDocument, {
      onError: (error) => {
        if (error.message.includes("access denied")) {
          // アプリがアンインストールした場合に、ここでエラーが出るのでログアウトさせる
          signOut();
        }
      },
    });
  const homeDate = useHomeDateStore((state) => state.homeDate);
  const setHomeItemsState = useSetRecoilState(homeItemsState);
  const [apiLoading, setApiLoading] = useState(true);
  const prevLoading = usePrevious(loading);

  useEffect(() => {
    setApiLoading(true);
    getItemsByDate({
      variables: {
        date: homeDate.date,
      },
    });
  }, [homeDate.date, getItemsByDate]);

  useEffect(() => {
    if (prevLoading !== null && !loading) {
      const items = (data?.itemsByDate || []).map((v) => ({
        id: v?.id || "",
        title: v?.title || "",
        categoryID: v?.categoryID || 1,
        date: v?.date || "",
        like: v?.like || false,
        dislike: v?.dislike || false,
        createdAt: v?.createdAt || "",
        updatedAt: v?.updatedAt || "",
      }));
      setHomeItemsState({ items });
      setApiLoading(false);
    }
  }, [loading, prevLoading, setHomeItemsState, data]);

  return {
    loading: apiLoading,
    error: error,
    refetch: refetch,
    client: client,
  };
};

export default useHomeItems;
