import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useMemoirNotificationSetting from 'hooks/useMemoirNotificationSetting';
import { memoirNotificationSetting } from '__mockData__/memoirNotificationSetting';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigation: jest.fn(),
    }),
  };
});

describe('components/pages/Setting/Memoir/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(useMemoirNotificationSetting, 'default')
      .mockImplementation((): any => ({
        ...memoirNotificationSetting(),
        loading: false,
        onSave: jest.fn(),
      }));

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
