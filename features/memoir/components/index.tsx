
import useSentryBreadcrumb from '@/hooks/useSentryBreadcrumb';
import { useLocalSearchParams } from "expo-router";
import dayjs from 'lib/dayjs';
import { type FC, memo } from 'react';
import Connected from './Connected';

type MemoirParams = {
  startDate: string;
  endDate: string;
    data: string;
};


type Data = {
  userIDList?: string[];
  categoryID?: number;
  like?: boolean;
  dislike?: boolean;
  search?: boolean;
};


const Memoir: FC = () => {
  useSentryBreadcrumb();
  const { startDate, endDate, data } = useLocalSearchParams<MemoirParams>();
  const parsedData = JSON.parse(data) as Data;

  return (
    <Connected
      startDate={
        startDate || dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00')
      }
      endDate={endDate || dayjs().format('YYYY-MM-DDT00:00:00+09:00')}
      userIDList={parsedData.userIDList ?? []}
      categoryID={parsedData.categoryID ?? 0}
      like={parsedData.like ?? true}
      dislike={parsedData.dislike ?? true}
      search={parsedData.search ?? false}
    />
  );
};

export default memo(Memoir);
