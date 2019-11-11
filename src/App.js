import React, {useState} from 'react';
import _ from './utils/_';
import '_/customized-vendors/fonts/material-design-icons/material-icons.css';
import '_/customized-vendors/fonts/roboto/roboto-font.css';
import '_/customized-vendors/materialize-css/dist/css/materialize.css';
import './App.scss';

import SideNav from './components/SideNav/SideNav';
import Profile from './components/Profile/Profile';
import GroupList from './components/GroupList/GroupList';
import Todo from './components/Todo/Todo';

const App = () => {
  const [todoItems, setTodoItems] = useState([
    {id: 1, title: 'Shortlist features for MVP'},
    {id: 2, title: 'Launch demo page for SEO analysis', isCompleted: true}
  ]);

  const todoId = (item) => item.id;

  const todoIndex = (item) => todoItems.findIndex((x) => todoId(x) === todoId(item));

  const handleAdd = () => {
    setTodoItems(_.push({id: _.randomStr(6), title: 'New To-do'}, todoItems));
  };

  const handleToggle = (item, state) => {
    setTodoItems(
      _.update(_.assoc('isCompleted', state), todoIndex(item, todoItems), todoItems)
    );
  };

  const handleDelete = (item) => {
    setTodoItems(_.removeBy(_.equalsBy(todoId), item, todoItems));
  };

  return (
    <div className="App">
      <aside>
        <SideNav>
          <div className="section">
            <div className="row">
              <div className="col s12">
                <Profile user={{name: 'Guglielmo Marconi'}} />
              </div>

              <div className="col s12">
                <GroupList items={[{title: 'Team To-do List', active: true}]} />
              </div>
            </div>
          </div>
        </SideNav>
      </aside>
      <main>
        <Todo
          group={{title: 'Team To-do List'}}
          items={todoItems}
          getItemId={todoId}
          onAdd={handleAdd}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
