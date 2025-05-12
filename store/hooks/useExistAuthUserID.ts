import { getItem, storageKey } from "@/lib/storage";
import { useCallback } from "react";

export const useExistAuthUserID = () => {
  return useCallback(async () => {
    const uid = await getItem(storageKey.AUTH_UID_KEY);
    return uid ?? null;
  }, []);
};
