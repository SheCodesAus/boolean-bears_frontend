import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

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
                    token:response.token,
                    username: credentials.username,
                });
                navigate("/");
            });
        }
    };

    return (
        <form>
            <h2>LOG IN</h2>
            <div>
                <label htmlFor="username">USER NAME</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="USER NAME" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">PASSWORD</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="PASSWORD" 
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                LOG IN
            </button>
            <div className="signup-prompt">
                Don't have an account yet?
                <br />
                Create one <Link to="/createaccount">here</Link> to start learning!
            </div>
        </form>
    );
}

export default LoginForm;

