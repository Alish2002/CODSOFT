import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aboutus from './Aboutus';
import Blogs from './Blogs';
import Layout from './Layout';
import Contact from './Contact';
import Main from '../Main/main';
import Login from '../auth/Login';
import Register from '../auth/Register';
import AuthContext from '../AuthContext';
import UserIcon from '../Navigation/UserIcon'; 

function Navigation() {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div >
        {/* <header>
          {state.isAuthenticated && <UserIcon />}
        </header> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Navigation;
