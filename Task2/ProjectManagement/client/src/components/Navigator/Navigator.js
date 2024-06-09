import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

const Navigator = ({ page }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  
  const Navigate=useNavigate();
  const handleLogout=()=>{
    dispatch(logout());
    Navigate('/');
  }
  return (
    <div className="w-full flex justify-between items-center p-5 bg-gray-800 text-white">
      <div className="pl-5 text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300 transition duration-300">
        ManageMate
        </Link>
      </div>
      <div className="text-xl font-semibold">
        <div className='flex space-x-8'>
          <Link to='/'>Home</Link>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
      </div>
      <div className="pr-5">
        {!isAuthenticated ? (
          <div className="flex space-x-4">
            <Link to="/login" className="text-blue-300 hover:text-blue-500 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="text-blue-300 hover:text-blue-500 transition duration-300">
              SignUp
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span>Hello, {user.name}</span>
            <button onClick={handleLogout} className="text-red-300 hover:text-red-500 transition duration-300">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigator;
