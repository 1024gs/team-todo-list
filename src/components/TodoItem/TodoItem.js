import React from 'react';
import './TodoItem.scss';

const TodoItem = ({item, getItemId, onToggle, onDelete}) => {
  const handleToggle = (e) => {
    onToggle(item, e.target.checked);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <span className={`TodoItem${item.isCompleted ? ' completed' : ''}`}>
      <span className="checkbox-no-label">
        <input
          type="checkbox"
          checked={!!item.isCompleted}
          id={`TodoItem-${getItemId(item)}`}
          onChange={handleToggle}
        />
        <label htmlFor={`TodoItem-${getItemId(item)}`}></label>
      </span>

      <span className="TodoItem-title truncate">{item.title}</span>
      <button className="TodoItem-delete btn-flat" onClick={handleDelete}>
        <i className="material-icons">delete</i>
      </button>
    </span>
  );
};

export default TodoItem;
