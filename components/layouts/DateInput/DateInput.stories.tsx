import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import DateInput from "./DateInput";

export default {
  title: "organisms/DateInput",
};

export const Default = () => <DateInput date="2021-01-01" onChange={mockFn} />;

Default.story = {
  name: "default",
};
