import React from 'react';
import Profile from './Profile';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign({user: {name: 'Guglielmo Marconi'}}, propOverrides);
  const wrapper = shallow(<Profile {...props} />);

  return {
    props,
    wrapper
  };
};

describe('Profile', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
