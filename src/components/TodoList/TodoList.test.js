import React from 'react';
import TodoList from './TodoList';
import sinon from 'sinon';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      items: [
        {id: 1, title: 'Todo 1'},
        {id: 2, title: 'Todo 2', isCompleted: true}
      ],
      getItemId: (x) => x.id,
      onAdd: sinon.spy(),
      onEdit: sinon.spy(),
      onToggle: sinon.spy(),
      onDelete: sinon.spy()
    },
    propOverrides
  );
  const wrapper = shallow(<TodoList {...props} />);

  return {
    props,
    wrapper
  };
};

describe('TodoList', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
