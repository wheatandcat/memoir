import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Compatibility from "./Compatibility";

export default {
  title: "components/layouts",
};

export const _Compatibility = () => (
  <Compatibility
    like={true}
    dislike={false}
    onLike={mockFn("onLike")}
    onDislike={mockFn("onDislike")}
  />
);
