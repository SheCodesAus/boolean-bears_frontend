import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

function LoginForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    // Function handleChange: the "Typing" Function 
    // Function handleSubmit: the "Login" Function
    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("username", credentials.username);
                setAuth({
                    token: response.token,
                    username: credentials.username,
                });
                navigate("/");
            });
        }
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <h2>Please enter your login credentials below.</h2>

            <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={credentials.username}
                />
            </div>

            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={credentials.password}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="primary-btn">
                    Log In
                </button>

                <p className="form-helper signup-prompt">
                    Don&apos;t have an account yet?
                    <br />
                    Create one <Link to="/createaccount">here</Link> to start learning!
                </p>
            </div>
        </form>
    );
}

export default LoginForm;

