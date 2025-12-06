import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";
import logoUrl from "../../img/Logo.png";

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
        <Link to="/contact">Contact</Link>
        <Link to="/courses">Courses</Link>

        <Link to="/createcourse">Create A Course</Link>

        {auth.token ? (
            <>
                <Link to="/" onClick={handleLogout}>
                    Log Out
                </Link>
                <Link
                    to={auth.userId ? `/users/${auth.userId}` : (auth.username ? `/users/${auth.username}` : "/")}
                    className="navbar-user"
                    aria-label="View your profile"
                >
                    Hello, {auth.username || "User"}
                </Link>
            </>
            ) : (
                        <>
                            <Link to="/createaccount">Create An Account</Link>
                            <Link to="/login">Log In</Link>
                        </>
        )}

        </nav>
        <Outlet />
    </div>
    );
}

export default NavBar;