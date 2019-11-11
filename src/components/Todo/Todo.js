import React from 'react';
import './Todo.scss';
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoList from '../TodoList/TodoList';
import TodoAdd from '../TodoAdd/TodoAdd';

const Todo = ({items, group, getItemId, onAdd, onEdit, onToggle, onDelete}) => {
  return (
    <div className="Todo">
      <TodoHeader
        title={group.title}
        subtitle={new Date().toLocaleString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          timeZone: 'UTC'
        })}
      />
      <TodoList
        items={items}
        getItemId={getItemId}
        onEdit={onEdit}
        onToggle={onToggle}
        onDelete={onDelete}
      />
      <TodoAdd onAdd={onAdd} />
    </div>
  );
};

export default Todo;
