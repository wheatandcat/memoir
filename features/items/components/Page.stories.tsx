import React from "react";
import { mockFn } from "storyBookUtils/index";
import Page from "./Page";

export default {
  title: "templates/ItemDetail",
};

export const _Page = () => (
  <Page
    loading={false}
    itemDate="2021-02-21"
    date="2021-02-21"
    onChangeDate={mockFn}
    title="本を読んだ"
    categoryID={1}
    like={false}
    dislike={false}
    onCloseUpdateItem={mockFn("onCloseUpdateItem")}
    onOpenUpdateItem={mockFn("onOpenUpdateItem")}
    onUpdateItem={mockFn("onUpdateItem")}
    onDeleteItem={mockFn("onDeleteItem")}
    openUpdateItemModal={false}
    updateItemLoading={false}
  />
);
