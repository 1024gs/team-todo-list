import React from 'react';
import Todo from './Todo';
import sinon from 'sinon';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      items: [
        {id: 1, title: 'Todo 1'},
        {id: 2, title: 'Todo 2', isCompleted: true}
      ],
      group: {title: 'Team To-do List'},
      getItemId: (x) => x.id,
      onAdd: sinon.spy(),
      onToggle: sinon.spy(),
      onDelete: sinon.spy()
    },
    propOverrides
  );
  const wrapper = shallow(<Todo {...props} />);

  return {
    props,
    wrapper
  };
};

describe('Todo', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
