import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

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
        <Link to="/">Home</Link>

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
            <Link to="/login">Login</Link>
        )}

        </nav>
        <Outlet />
    </div>
    );
}

export default NavBar;