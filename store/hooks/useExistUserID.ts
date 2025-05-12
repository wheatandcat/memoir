import { getItem, storageKey } from "@/lib/storage";
import { useCallback } from "react";

export const useExistUserID = () => {
  return useCallback(async () => {
    const uid = await getItem(storageKey.USER_ID_KEY);
    return uid ?? null;
  }, []);
};
