import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useItemsByDateLazyQuery } from 'queries/api/index';
import { homeDateState, homeItemsState } from 'store/atoms';

const useHomeItems = () => {
  const [
    getItemsByDate,
    { data, loading, error, refetch },
  ] = useItemsByDateLazyQuery();
  const homeDate = useRecoilValue(homeDateState);
  const setHomeItemsState = useSetRecoilState(homeItemsState);

  useEffect(() => {
    getItemsByDate({
      variables: {
        date: homeDate.date,
      },
    });
  }, [homeDate.date, getItemsByDate]);

  useEffect(() => {
    if (!loading) {
      const items = (data?.itemsByDate || []).map((v) => ({
        id: v?.id || '',
        title: v?.title || '',
        categoryID: v?.categoryID || 1,
        date: v?.date || '',
        like: v?.like || false,
        dislike: v?.dislike || false,
        createdAt: v?.createdAt || '',
        updatedAt: v?.updatedAt || '',
      }));
      setHomeItemsState({ items });
    }
  }, [loading, setHomeItemsState, data]);

  return {
    loading: loading,
    error: error,
    refetch: refetch,
  };
};

export default useHomeItems;
