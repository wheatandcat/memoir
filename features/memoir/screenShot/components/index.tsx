import { useLocalSearchParams } from "expo-router";
import type React from "react";
import { memo } from "react";
import Connected from "./Connected";

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

const MemoirScreenShot: React.FC = () => {
  const { startDate, endDate } = useLocalSearchParams<MemoirParams>();

  return (
    <Connected
      startDate={startDate}
      endDate={endDate}
      selectedUserIDList={[]}
      categoryID={0}
      like={true}
      dislike={true}
    />
  );
};

export default memo(MemoirScreenShot);
