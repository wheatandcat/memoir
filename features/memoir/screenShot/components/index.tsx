import { useLocalSearchParams } from "expo-router";
import type React from "react";
import { memo } from "react";
import Connected from "./Connected";

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
};

const MemoirScreenShot: React.FC = () => {
  const { startDate, endDate, data } = useLocalSearchParams<MemoirParams>();
  const parsedData = JSON.parse(data) as Data;

  return (
    <Connected
      startDate={startDate}
      endDate={endDate}
      selectedUserIDList={parsedData.userIDList ?? []}
      categoryID={parsedData.categoryID ?? 0}
      like={parsedData.like ?? true}
      dislike={parsedData.dislike ?? true}
    />
  );
};

export default memo(MemoirScreenShot);
