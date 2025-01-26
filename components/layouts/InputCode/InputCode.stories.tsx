import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import InputCode from "./InputCode";
import type { Props } from "./InputCode";

const props = (): Props => ({
  value: "",
  onChange: mockFn("onChange"),
});

export default {
  title: "molecules/InputCode",
};

export const _InputCode = () => <InputCode {...props()} />;

_InputCode.story = {
  name: "InputCode",
};
