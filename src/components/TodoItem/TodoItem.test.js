import React from 'react';
import TodoItem from './TodoItem';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';

const setup = (propOverrides, doMount) => {
  const props = Object.assign(
    {
      item: {id: 1, title: 'Todo 1'},
      getItemId: (x) => x.id,
      onToggle: sinon.spy(),
      onDelete: sinon.spy()
    },
    propOverrides
  );
  const wrapper = (doMount ? mount : shallow)(<TodoItem {...props} />);

  return {
    props,
    wrapper
  };
};

describe('TodoItem', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('has class completed', () => {
    const {wrapper} = setup({item: {id: 1, title: 'a', isCompleted: true}});
    // expect(wrapper.hasClass('completed')).toBe(true);
    /* The above doesn't work. https://github.com/airbnb/enzyme/issues/307 */
    expect(wrapper.find('.TodoItem').hasClass('completed')).toBe(true);
  });

  it('has NOT class completed', () => {
    const {wrapper} = setup({item: {id: 1, title: 'a', isCompleted: false}});
    // expect(wrapper.hasClass('completed')).toBe(false);
    /* The above doesn't work. https://github.com/airbnb/enzyme/issues/307 */
    expect(wrapper.find('.TodoItem').hasClass('completed')).toBe(false);
  });

  it('calls onToggle correctly', () => {
    const {wrapper, props} = setup({item: {id: 1, title: 'a'}}, true);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(props.onToggle.calledWithExactly({id: 1, title: 'a'}, false)).toBe(true);
    wrapper.unmount();
  });

  it('calls onDelete correctly', () => {
    const {wrapper, props} = setup({item: {id: 1, title: 'a'}}, true);
    wrapper.find('.TodoItem-delete').simulate('click');
    expect(props.onDelete.calledWithExactly({id: 1, title: 'a'})).toBe(true);
    wrapper.unmount();
  });
});
