import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // LOADING STATE
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        // START LOADING
        setLoading(true);

        try {

            const res = await API.post("/auth/login", {
                email,
                password
            });

            // SAVE TOKEN
            localStorage.setItem("token", res.data.token);

            // SAVE ROLE
            localStorage.setItem("role", res.data.role);

            // STOP LOADING
            setLoading(false);

            alert("Login Success");

            navigate("/dashboard");

        } catch (error) {

            // STOP LOADING
            setLoading(false);

            alert("Login Failed");

        }
    };

    return (

        <div>

            <h1>Login Page</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">

                    {
                        loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>

                

            </form>+

        </div>
    );
}

export default Login;