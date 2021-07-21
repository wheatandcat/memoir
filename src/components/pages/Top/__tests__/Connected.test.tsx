import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useFirebaseAuth from 'hooks/useFirebaseAuth';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({
  onSkip: jest.fn(),
});

describe('components/pages/Top/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(useFirebaseAuth, 'default').mockImplementation((): any => ({
      setup: true,
      onAppleLogin: jest.fn(),
      onGoogleLogin: jest.fn(),
    }));

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
