import React from "react";
import SeeYouAgain, { type Props } from "./SeeYouAgain";

const props = (): Props => ({});

export default {
  title: "templates/SeeYouAgain",
};

export const _SeeYouAgain = () => <SeeYouAgain {...props()} />;

_SeeYouAgain.story = {
  name: "SeeYouAgain",
};
