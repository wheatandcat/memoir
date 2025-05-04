import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Card from "./Card";

export default {
  title: "components/layouts/Card",
};

export const _Card = () => (
  <Card title="本を読んだ" categoryID={1} onPress={mockFn("onPress")} />
);
