import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "https://smart-community-management-system.onrender.com/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (

        <div>

            <h1>Register Page</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

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
                    Register
                </button>

                <br /><br />

                <Link to="/">
                    Already have account? Login
                </Link>

            </form>

        </div>
    );
}

export default Register;