import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthContext';

const Login = () => {
    const [user, setUser] = useState({
      username: '',
      password: ''
    });
  
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUser({
        ...user,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user)
        });
  
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem('token', data.token);
          dispatch({ type: 'LOGIN', payload: { username: user.username } });
          navigate('/');
        } else {
          // Handle login error (e.g., show an error message)
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="container">
        <div className="login-head">Login:</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  