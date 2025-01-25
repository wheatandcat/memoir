import { items } from "__mockData__/item";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Cards from "./Cards";
import type { Props } from "./Cards";

const props = (loading: boolean): Props => ({
  items: items(),
  onItem: mockFn("onItem"),
  onAddItem: mockFn("onAddItem"),
  loading,
  addItemLoading: false,
  date: "2021-02-21",
});

export default {
  title: "organisms/Cards",
};

export const デフォルト = () => <Cards {...props(false)} />;
export const ローディング = () => <Cards {...props(true)} />;
