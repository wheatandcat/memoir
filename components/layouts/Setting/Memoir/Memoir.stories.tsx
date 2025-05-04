import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Input from "./Input";
import type { Props as InputProps } from "./Input";
import Notification from "./Notification";
import type { Props as NotificationProps } from "./Notification";

const inputProps = (): InputProps => ({
  dayOfWeek: 0,
  time: new Date("0000-01-01T00:00:00"),
  onChangeDayOfWeek: mockFn("onChangeDayOfWeek"),
  onChangeTime: mockFn("onChangeTime"),
});

const notificationProps = (): NotificationProps => ({
  push: 0,
  setPush: mockFn("setPush"),
});

export default {
  title: "components/layouts/Setting/Memoir",
};

export const _Input = () => <Input {...inputProps()} />;
export const _Notification = () => <Notification {...notificationProps()} />;
