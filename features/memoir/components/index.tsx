import useSentryBreadcrumb from "@/hooks/useSentryBreadcrumb";
import dayjs from "@/lib/dayjs";
import { useLocalSearchParams } from "expo-router";
import type { FC } from "react";
import { memo } from "react";
import Connected from "./Connected";

type MemoirParams = {
  startDate: string;
  endDate: string;
  data: string;
};

const Memoir: FC = () => {
  useSentryBreadcrumb();
  const { startDate, endDate, data } = useLocalSearchParams<MemoirParams>();

  const parsedData = data ? JSON.parse(data) : {};

  return (
    <Connected
      startDate={
        startDate || dayjs().add(-6, "day").format("YYYY-MM-DDT00:00:00+09:00")
      }
      endDate={endDate || dayjs().format("YYYY-MM-DDT00:00:00+09:00")}
      userIDList={parsedData.userIDList ?? []}
      categoryID={parsedData.categoryID ?? 0}
      like={parsedData.like ?? true}
      dislike={parsedData.dislike ?? true}
      search={parsedData.search ?? false}
    />
  );
};

export default memo(Memoir);
