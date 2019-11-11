import React from 'react';
import SideNav from './SideNav';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign({children: <div className="unique" />}, propOverrides);
  const wrapper = shallow(<SideNav {...props} />);

  return {
    props,
    wrapper
  };
};

describe('SideNav', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children when passed in', () => {
    const {wrapper} = setup({children: <div className="avatar" />});
    expect(wrapper.contains(<div className="avatar" />)).toBe(true);
  });
});
