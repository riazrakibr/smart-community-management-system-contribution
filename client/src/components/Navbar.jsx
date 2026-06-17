import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");
    const [notificationCount, setNotificationCount] = useState(0);

useEffect(() => {

    fetchNotificationCount();

    const interval = setInterval(() => {
        fetchNotificationCount();
    }, 100);

    return () => clearInterval(interval);

}, []);

const fetchNotificationCount = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            "https://smart-community-management-system.onrender.com/api/notifications/count",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setNotificationCount(res.data.count);

    } catch (error) {

        console.log(error);

    }
};
    const logoutUser = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    return (

        <nav
            style={{
                background: "#2c3e50",
                padding: "15px",
                display: "flex",
                gap: "20px"
            }}
        >

            {!token && (
                <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Login
                </Link>
            )}

            {!token && (
                <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Register
                </Link>
            )}

            {token && (
                <Link
                    to="/dashboard"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Dashboard
                </Link>
            )}

            {token && (
                <Link
                    to="/ai"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    AI Suggestion
                </Link>
            )}
            {token && (
    <Link
        to="/profile"
        style={{ color: "white", textDecoration: "none" }}
    >
        Profile
    </Link>
)}

            {token && (
                <Link
                    to="/sustainability"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Sustainability
                </Link>
            )}
            {token && (
    <Link
        to="/notifications"
        style={{
            color: "white",
            textDecoration: "none",
            position: "relative"
        }}
    >
        Notifications

        {notificationCount > 0 && (
            <span
                style={{
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    marginLeft: "5px",
                    fontSize: "12px"
                }}
            >
                {notificationCount}
            </span>
        )}

    </Link>
)}
            {token && (
                <button
                    onClick={logoutUser}
                    style={{
                        background: "crimson",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            )}

        </nav>
    );
}

export default Navbar;