import FocusAwareStatusBar from "@/components/layouts/FocusAwareStatusBar";
import theme from "@/config/theme";
import Page from "@/features/memoir/components";
import React from "react";

export default function ModalScreen() {
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="light"
      />
      <Page />
    </>
  );
}
