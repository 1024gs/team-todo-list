import React from 'react';
import TodoAdd from './TodoAdd';
import sinon from 'sinon';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign({onAdd: sinon.spy()}, propOverrides);
  const wrapper = shallow(<TodoAdd {...props} />);

  return {
    props,
    wrapper
  };
};

describe('TodoAdd', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
