import { item } from "__mockData__/item";
import React from "react";
import Card from "./Card";

export default {
  title: "organisms/Memoir",
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
