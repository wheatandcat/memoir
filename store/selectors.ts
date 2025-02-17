import { getItem, storageKey } from "@/lib/storage";
import { authUserState } from "@/store/atoms";
import { selector } from "recoil";

export const existUserID = selector({
  key: "existUser",
  get: async () => {
    const uid = await getItem(storageKey.USER_ID_KEY);

    if (uid) {
      return uid;
    }

    return null;
  },
});

export const existAuthUserID = selector({
  key: "existAuthUser",
  get: async ({ get }) => {
    get(authUserState);
    const uid = await getItem(storageKey.AUTH_UID_KEY);
    if (uid) {
      return uid;
    }

    return null;
  },
});
