import { memoirNotificationSetting } from "@/mocks/__mockData__/memoirNotificationSetting";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Page, { type Props } from "./Page";

const props = (): Props => ({
  ...memoirNotificationSetting(),
  onSave: mockFn("onSave"),
});

export default {
  title: "features/setting/memoir",
};

export const _Page = () => <Page {...props()} />;
