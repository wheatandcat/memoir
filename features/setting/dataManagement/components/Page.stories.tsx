import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Page, { type Props } from "./Page";

const props = (): Props => ({
  loading: false,
  disabledDeleteButton: false,
  onDelete: mockFn("onDelete"),
});

export default {
  title: "features/setting/dataManagement",
};

export const _Page = () => <Page {...props()} />;
