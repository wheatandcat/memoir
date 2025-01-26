import { mockFn } from "@/storyBookUtils/index";
import React from "react";
import Form from "./Form";
import type { Props } from "./Form";

const props = (): Props => ({
  onAppleLogin: mockFn("onAppleLogin"),
  onGoogleLogin: mockFn("onGoogleLogin"),
});

export default {
  title: "organisms/Login",
};

export const _Form = () => <Form {...props()} />;
