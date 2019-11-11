import React from 'react';
import './TodoAdd.scss';

const TodoAdd = ({onAdd}) => {
  return (
    <div className="TodoAdd">
      <div className="row">
        <div className="col s12">
          <button className="btn-flat waves-effect" onClick={onAdd}>
            <i className="material-icons left">add_circle</i>
            Add a to-do
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoAdd;
