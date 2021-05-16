import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ProfileImage, { Props } from '../ProfileImage';

const propsData = (): Props => ({
  image: '',
  onChangeImage: jest.fn(),
});

describe('components/organisms/UpdateProfile/ProfileImage.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ProfileImage {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
