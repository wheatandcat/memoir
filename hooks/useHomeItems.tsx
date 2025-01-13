import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ItemsByDateDocument } from 'queries/api/index';
import { homeDateState, homeItemsState } from 'store/atoms';
import usePrevious from '@/hooks/usePrevious';
import { useLazyQuery } from '@apollo/client';

const useHomeItems = () => {
  const [getItemsByDate, { data, loading, error, refetch, client }] =
    useLazyQuery(ItemsByDateDocument);
  const homeDate = useRecoilValue(homeDateState);
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
