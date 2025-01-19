import React from "react";
import { mockFn } from "storyBookUtils/index";
import Input, { type Props as InputProps } from "./Input";
import Notification, { type Props as NotificationProps } from "./Notification";

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
  title: "organisms/Setting/Memoir",
};

export const _Input = () => <Input {...inputProps()} />;
export const _Notification = () => <Notification {...notificationProps()} />;
