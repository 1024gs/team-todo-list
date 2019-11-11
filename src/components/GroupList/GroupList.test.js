import React from 'react';
import GroupList from './GroupList';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign(
    {items: [{title: 'Team To-do List', active: true}]},
    propOverrides
  );
  const wrapper = shallow(<GroupList {...props} />);

  return {
    props,
    wrapper
  };
};

describe('GroupList', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('has an active item', () => {
    const {wrapper} = setup({
      items: [{title: 'a'}, {title: 'b', active: true}]
    });
    expect(
      wrapper
        .find('.collection-item')
        .at(0)
        .hasClass('active')
    ).toBe(false);
    expect(
      wrapper
        .find('.collection-item')
        .at(1)
        .hasClass('active')
    ).toBe(true);
  });
});
