import React from "react";
import { mockFn } from "storyBookUtils/index";
import Compatibility from "./Compatibility";

export default {
  title: "organisms",
};

export const _Compatibility = () => (
  <Compatibility
    like={true}
    dislike={false}
    onLike={mockFn("onLike")}
    onDislike={mockFn("onDislike")}
  />
);
