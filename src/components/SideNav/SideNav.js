import React from 'react';
import './SideNav.scss';

const SideNav = ({children}) => {
  return <div className="SideNav side-nav fixed">{children}</div>;
};

export default SideNav;
