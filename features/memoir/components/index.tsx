
import { useLocalSearchParams } from "expo-router";
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import dayjs from 'lib/dayjs';
import { type FC, memo } from 'react';
import Connected from './Connected';

type MemoirParams = {
  startDate: string;
  endDate: string;
  // NOTE: ナビゲーションにstring以外のパラメータを直接渡せないので一旦コメントアウト
  /*
  userIDList?: string[];
  categoryID?: number;
  like?: boolean;
  dislike?: boolean;
  search?: boolean;
  */
};

const Memoir: FC = () => {
  useSentryBreadcrumb();
  const { startDate, endDate } = useLocalSearchParams<MemoirParams>();

  return (
    <Connected
      startDate={
        startDate || dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00')
      }
      endDate={endDate || dayjs().format('YYYY-MM-DDT00:00:00+09:00')}
      userIDList={[]}
      categoryID={0}
      like={true}
      dislike={true}
      search={true}
    />
  );
};

export default memo(Memoir);
