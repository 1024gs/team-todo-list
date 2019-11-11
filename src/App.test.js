import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

const setup = (propOverrides) => {
  const props = Object.assign({}, propOverrides);
  const wrapper = shallow(<App {...props} />);

  return {
    props,
    wrapper
  };
};

describe('App', () => {
  it('renders', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
