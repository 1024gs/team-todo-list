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
    {id: 1, title: 'Shortlist features for MVP', groupId: 1},
    {id: 2, title: 'Launch demo page for SEO analysis', isCompleted: true, groupId: 1}
  ]);
  const [groupItems, setGroupItems] = useState([
    {id: 1, title: 'Team To-do List', active: true},
    {id: 2, title: 'Team2 To-do List'}
  ]);

  const propId = _.prop('id');

  const activeGroup = () => groupItems.find((x) => x.active);

  const findIndexByPropId = (item, items) => items.findIndex(_.equalsBy(propId, item));

  const handleAdd = () => {
    setTodoItems(
      _.push(
        {id: _.randomStr(6), title: 'New To-do', groupId: activeGroup().id},
        todoItems
      )
    );
  };

  const handleToggle = (item, state) => {
    setTodoItems(
      _.update(
        _.assoc('isCompleted', state),
        findIndexByPropId(item, todoItems),
        todoItems
      )
    );
  };

  const handleDelete = (item) => {
    setTodoItems(_.removeBy(_.equalsBy(propId), item, todoItems));
  };

  const handleGroupClick = (item) => {
    setGroupItems(
      _.update(
        _.assoc('active', true),
        findIndexByPropId(item, groupItems),
        groupItems.map(_.dissoc('active'))
      )
    );
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
                <GroupList items={groupItems} onClick={handleGroupClick} />
              </div>
            </div>
          </div>
        </SideNav>
      </aside>
      <main>
        <Todo
          group={activeGroup()}
          items={todoItems.filter((x) => x.groupId === activeGroup().id)}
          getItemId={propId}
          onAdd={handleAdd}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
