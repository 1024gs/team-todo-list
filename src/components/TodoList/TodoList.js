import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({items, getItemId, onAdd, onToggle, onDelete}) => {
  return (
    <div className="TodoList">
      {items.map((item) => (
        <TodoItem
          item={item}
          key={getItemId(item)}
          getItemId={getItemId}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
