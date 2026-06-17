import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://smart-community-management-system.onrender.com/api/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Notifications:", res.data);

            setNotifications(res.data);
            await axios.put(
    "https://smart-community-management-system.onrender.com/api/notifications/read",
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

        } catch (error) {

            console.log("Notification Error:", error);

        }
    };

   return (

    <div className="container">

        <h1>Notifications</h1>

        {
            notifications.length === 0 ? (

                <p>No Notifications</p>

            ) : (

                notifications.map((n) => (

                    <div
                        key={n._id}
                        className="issue-card"
                    >
                        <h4>🔔 Notification</h4>
                        <p>{n.message}</p>
                    </div>

                ))

            )
        }

    </div>

);
}

export default Notifications;