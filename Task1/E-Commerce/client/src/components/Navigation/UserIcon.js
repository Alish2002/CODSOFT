import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const UserIcon = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      {state.isAuthenticated ? (
        <>
          <span>Welcome, {state.user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : null }
    </div>
  );
};

export default UserIcon;
