import React from 'react';
import './GroupList.scss';

const GroupList = ({items, onClick}) => {
  return (
    <div className="GroupList">
      <ul className="collection">
        {items.map((x, i) => (
          <li
            className={`collection-item${x.active ? ' active' : ''}`}
            key={i}
            onClick={() => onClick(x)}
          >
            <i className="material-icons left">list</i>
            {x.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
