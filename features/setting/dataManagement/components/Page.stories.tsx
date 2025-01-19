import React from "react";
import { mockFn } from "storyBookUtils/index";
import Page, { type Props } from "./Page";

const props = (): Props => ({
  loading: false,
  disabledDeleteButton: false,
  onDelete: mockFn("onDelete"),
});

export default {
  title: "templates/Setting/DataManagement",
};

export const _Page = () => (
  <Page {...props()} showActionSheetWithOptions={() => null} />
);
