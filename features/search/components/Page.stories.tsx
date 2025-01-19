import { users } from "__mockData__/user";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Page, { type Props } from "./Page";

const props = (userLength = 5): Props => ({
  users: users().slice(0, userLength),
  onSearch: mockFn("onSearch"),
});

export default {
  title: "templates/Search/Page",
};

export const _1人 = () => <Page {...props(1)} />;
export const _2人 = () => <Page {...props(2)} />;
export const _3人 = () => <Page {...props(3)} />;
export const _4人 = () => <Page {...props(4)} />;
export const _5人 = () => <Page {...props(5)} />;
