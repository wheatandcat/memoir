import { items } from "@/mocks/__mockData__/item";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Page from "./Page";
import type { Props } from "./Page";

const props = (): Props => ({
  items: items().map((v) => ({ ...v, userID: "test" })),
  pageInfo: {
    hasNextPage: false,
    endCursor: "",
  },
  onLoadMore: mockFn("onLoadMore"),
  loading: false,
  startDate: "2020-01-01",
  endDate: "2020-01-07",
  users: [
    {
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    },
  ],
  selectedUserIDList: ["test"],
  onChangeUserID: mockFn("onChangeUserID"),
  onScreenShot: mockFn("onScreenShot"),
  search: false,
});

export default {
  title: "templates/Memoir/Page",
};

export const ユーザー1人 = () => <Page {...props()} />;

ユーザー1人.story = {
  name: "ユーザー:1人",
};

export const ユーザー複数 = () => (
  <Page
    {...props()}
    users={[
      {
        id: "test",
        displayName: "suzuki",
        image: "https://placehold.jp/150x150.png",
      },
      {
        id: "test2",
        displayName: "suzuki",
        image: "https://placehold.jp/250x250.png",
      },
      {
        id: "test3",
        displayName: "suzuki",
        image: "https://placehold.jp/350x350.png",
      },
    ]}
  />
);

ユーザー複数.story = {
  name: "ユーザー:複数",
};
