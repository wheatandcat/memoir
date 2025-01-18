import { screen } from "@testing-library/react-native";
import { testRenderer } from "lib/testUtil";
import React from "react";
import Form, { type Props } from "../Form";

const propsData = (): Props => ({
  onAppleLogin: jest.fn(),
  onGoogleLogin: jest.fn(),
});

describe("components/organisms/Login/Form.tsx", () => {
  it("正常にrenderすること", () => {
    testRenderer(<Form {...propsData()} />)();
    expect(screen.findByTestId("apple-login")).toBeTruthy();
  });
});
