import React from 'react';
import './Profile.scss';

const Profile = ({user}) => {
  return (
    <div className="Profile">
      <div className="Profile-avatar">
        <i className="material-icons">account_circle</i>
      </div>
      <div className="Profile-username">{user.name}</div>
    </div>
  );
};

export default Profile;
