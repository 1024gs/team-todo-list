import React from 'react';
import TodoHeader from './TodoHeader';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign(
    {title: 'Team To-do List', subtitle: 'It might be a date'},
    propOverrides
  );
  const wrapper = shallow(<TodoHeader {...props} />);

  return {
    props,
    wrapper
  };
};

describe('TodoHeader', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
