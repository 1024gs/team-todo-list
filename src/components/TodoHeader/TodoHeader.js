import React from 'react';
import './TodoHeader.scss';

const TodoHeader = ({title, subtitle}) => {
  return (
    <div className="TodoHeader">
      <div className="no-collapsing-margins">
        <div className="row">
          <div className="col s12">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;
