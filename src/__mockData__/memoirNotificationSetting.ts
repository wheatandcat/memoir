import type { State as MemoirNotificationSettingState } from "@/hooks/useMemoirNotificationSetting";

export const memoirNotificationSetting = (
  option?: Partial<MemoirNotificationSettingState>
): MemoirNotificationSettingState => ({
  dayOfWeek: 1,
  hours: 0,
  minutes: 0,
  notification: false,
  ...option,
});
