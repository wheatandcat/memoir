import React from 'react';
import SeeYouAgain, { Props } from './SeeYouAgain';

const props = (): Props => ({});

export default {
  title: 'templates/SeeYouAgain',
};

export const _SeeYouAgain = () => <SeeYouAgain {...props()} />;

_SeeYouAgain.story = {
  name: 'SeeYouAgain',
};
