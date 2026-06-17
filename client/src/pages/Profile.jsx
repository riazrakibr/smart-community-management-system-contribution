import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const [user, setUser] = useState({});
    const [totalIssues, setTotalIssues] = useState(0);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://smart-community-management-system.onrender.com/api/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(res.data.user);
            setTotalIssues(res.data.totalIssues);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="container">

            <h1>My Profile</h1>

            <div className="issue-card">

                <h3>Name: {user.name}</h3>

                <p>Email: {user.email}</p>

                <p>Role: {user.role}</p>

                <p>Total Issues Reported: {totalIssues}</p>

            </div>

        </div>

    );
}

export default Profile;