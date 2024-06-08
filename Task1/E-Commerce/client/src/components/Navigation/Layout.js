import { Link, Outlet} from "react-router-dom";
import UserIcon from '../Navigation/UserIcon';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

const Layout = () => {
    const { state } = useContext(AuthContext);

    return (
        <>
            <nav>
                <div className="header" >
                    <p className="logo">FitFeet Fashions</p>
                    <ul >
                        <li>
                            <Link className="link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="link" to="/Blogs">Blogs</Link>
                        </li>
                        <li>
                            <Link className="link" to="/Contact">Contact</Link>
                        </li>
                        <li>
                            <Link className="link" to="/Aboutus">About</Link>
                        </li>
                    </ul>
                    <div>
                        <ul>
                            {state.isAuthenticated ? (
                                <li>
                                    <UserIcon />
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
export default Layout;
