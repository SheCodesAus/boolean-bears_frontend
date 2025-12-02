import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateAccount from "../api/post-createaccount";

function CreateAccountForm() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        emailaddress: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    // Create the async submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        // Basic check to ensure all fields are filled
        if (!credentials.username || !credentials.emailaddress || !credentials.password) {
            setError("All fields must be filled.");
            return;
        }

        const payload = {
            username: credentials.username,
            email: credentials.emailaddress,
            password: credentials.password,
        };

        try {
            await postCreateAccount(payload);

            // SUCCESS: Redirect to the the login page.
            alert("Account created successfully! Please log in.");
            navigate("/login");

        } catch (err) {
            // FAILURE: Set error state to display message to user
            console.error("Create Account Error:", err.message);
            setError(err.message);
        }
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <h2>Please create your account below by entering your details.</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

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
                <label htmlFor="emailaddress">Email</label>
                <input
                    type="text"
                    id="emailaddress"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={credentials.emailaddress}
                />
            </div>

            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter a password"
                    onChange={handleChange}
                    value={credentials.password}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="primary-btn">
                    Sign Up
                </button>
            </div>
        </form>
    );
}

export default CreateAccountForm;