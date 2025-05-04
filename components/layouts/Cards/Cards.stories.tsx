import { items } from "@/mocks/__mockData__/item";
import { mockFn } from "@/storyBookUtils/index";
import React from "react";
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
  title: "components/layouts/Cards",
};

export const デフォルト = () => <Cards {...props(false)} />;
export const ローディング = () => <Cards {...props(true)} />;
