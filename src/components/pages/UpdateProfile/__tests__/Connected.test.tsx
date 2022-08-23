import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Recoil from 'recoil';
import * as client from '@apollo/client';
import Connected, { Props } from '../Connected';

const propsData = (): Props => ({});

describe('components/pages/UpdateProfile/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(Recoil, 'useRecoilState')
      .mockImplementation((): any => [
        { id: 'test-id', displayName: 'test-name' },
        jest.fn(),
      ]);
    jest.spyOn(Recoil, 'useRecoilValue').mockImplementation((): any => ({
      uid: 'test',
    }));
    jest
      .spyOn(client, 'useMutation')
      .mockImplementation((): any => [jest.fn(), { loading: false }]);
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
