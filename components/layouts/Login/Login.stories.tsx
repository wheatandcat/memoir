import React from "react";
import { mockFn } from "storyBookUtils/index";
import Form, { type Props } from "./Form";

const props = (): Props => ({
  onAppleLogin: mockFn("onAppleLogin"),
  onGoogleLogin: mockFn("onGoogleLogin"),
});

export default {
  title: "organisms/Login",
};

export const _Form = () => <Form {...props()} />;
