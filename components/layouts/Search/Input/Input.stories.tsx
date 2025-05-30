import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import InputCategory from "./InputCategory";
import type { Props as InputCategoryProps } from "./InputCategory";
import InputDate from "./InputDate";
import type { Props as InputDateProps } from "./InputDate";

const inputDateProps = (): InputDateProps => ({
  startDate: new Date("2021-01-01T00:00:00+09:00"),
  endDate: new Date("2021-01-18T00:00:00+09:00"),
  onChangeStartDate: mockFn("onChangeStartDate"),
  onChangeEndDate: mockFn("onChangeStartDate"),
});

const inputCategoryProps = (): InputCategoryProps => ({
  categoryID: 1,
  onPress: mockFn("onPress"),
});

export default {
  title: "components/layouts/Search/Input",
};

export const _InputDate = () => <InputDate {...inputDateProps()} />;

_InputDate.story = {
  name: "InputDate",
};

export const _InputCategory = () => <InputCategory {...inputCategoryProps()} />;

_InputCategory.story = {
  name: "InputCategory",
};
