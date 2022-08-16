import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import SettingModal, { Props } from '../SettingModal';

const propsData = (): Props => ({
  isVisible: true,
  onClose: jest.fn(),
});

describe('components/organisms//SettingModal.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: 'abc',
    }));
    wrapper = shallow(<SettingModal {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
