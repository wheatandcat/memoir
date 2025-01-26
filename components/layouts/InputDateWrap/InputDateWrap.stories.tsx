import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import InputDateWrap from "./InputDateWrap";

export default {
  title: "organisms",
};

export const _InputDateWrap = () => (
  <InputDateWrap date="2020-01-01" onChangeDate={mockFn} />
);

_InputDateWrap.story = {
  name: "InputDateWrap",
  parameters: { loki: { skip: true } },
};
