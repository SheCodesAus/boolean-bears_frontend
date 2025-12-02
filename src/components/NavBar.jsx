import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";
import logoUrl from "../../img/yarningcircles_logo_transparent.png";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        setAuth({ token: null, username: null });
    };

    return (
    <div>
        <nav id="navbar">
        <Link to="/" className="logo-link" aria-label="Home">
            <img src={logoUrl} alt="Home" className="navbar-logo" />
        </Link>

        <Link to="/about">About</Link>

        <Link to="/createcourse">Create A Course</Link>

        <Link to="/createaccount">Create An Account</Link>

        {auth.token ? (
            <>
                <Link to="/" onClick={handleLogout}>
                    Log Out
                </Link>
                <span className="navbar-user">
                    Hello, {auth.username || "User"}
                </span>
            </>
            ) : (
            <Link to="/login">Log In</Link>
        )}

        </nav>
        <Outlet />
    </div>
    );
}

export default NavBar;