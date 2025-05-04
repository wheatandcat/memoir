import { item } from "@/mocks/__mockData__/item";
import React from "react";
import Card from "./Card";

export default {
  title: "components/layouts/Memoir",
};

export const _Card = () => (
  <Card
    {...item()}
    user={{
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    }}
  />
);
