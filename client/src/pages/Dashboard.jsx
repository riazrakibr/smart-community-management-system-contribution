import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // LOADING STATE
    const [loading, setLoading] = useState(false);


    // CREATE ISSUE
    const submitIssue = async (e) => {

        e.preventDefault();

        // START LOADING
        setLoading(true);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("image", image);

        try {

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "https://smart-community-management-system.onrender.com/api/issues",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Issue Submitted");

            console.log(res.data);

            // CLEAR FORM
            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");
            setImage(null);

            // STOP LOADING
            setLoading(false);

            fetchIssues();

        } catch (error) {

            console.log(error);

            // STOP LOADING
            setLoading(false);

            alert("Error submitting issue");
        }
    };



    // FETCH ISSUES
    const fetchIssues = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://smart-community-management-system.onrender.com/api/issues",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setIssues(res.data);

        } catch (error) {

            console.log(error);
        }
    };



    // UPDATE STATUS
    const updateStatus = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `https://smart-community-management-system.onrender.com/api/issues/${id}`,
                {
                    status: "Resolved"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Issue Resolved");

            fetchIssues();

        } catch (error) {

            console.log(error);

            alert("Error updating status");
        }
    };



    // DELETE ISSUE
    const deleteIssue = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `https://smart-community-management-system.onrender.com/api/issues/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Issue Deleted");

            fetchIssues();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");
        }
    };



    // LOGOUT
    const logoutUser = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        alert("Logged out");

        window.location.href = "/";
    };



    // LOAD ISSUES
    useEffect(() => {
        fetchIssues();
    }, []);


const totalIssues = issues.length;

const pendingIssues = issues.filter(
    issue => issue.status === "Pending"
).length;

const resolvedIssues = issues.filter(
    issue => issue.status === "Resolved"
).length;
return (

    <div className="container">

        <div className="hero-section">

            <h1>🏙️ Smart Community Management System</h1>

            <p>
                Report Issues • AI Suggestions • Sustainability Tracking 
            </p>

        </div>

        <h1>Smart Community Dashboard</h1>

        <button
            className="logout-btn"
            onClick={logoutUser}
        >
            Logout
            </button>

            <br /><br />
        <div className="stats-container">

        <div className="card">
            <h3>Total Issues</h3>
            <h2>{totalIssues}</h2>
        </div>

        <div className="card">
            <h3>Pending</h3>
            <h2>{pendingIssues}</h2>
        </div>

            <div className="card">
            <h3>Resolved</h3>
            <h2>{resolvedIssues}</h2>
            </div>

        </div>
            <h3>Create Community Issue</h3>

            <form onSubmit={submitIssue}>

                <input
                    type="text"
                    placeholder="Issue Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Issue Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <br /><br />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Road">Road</option>
                    <option value="Security">Security</option>
                </select>

                <br /><br />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <br /><br />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <br /><br />

                <button type="submit">

                    {
                        loading
                        ? "Submitting..."
                        : "Submit Issue"
                    }

                </button>

            </form>


            <hr />

            <h2>All Issues</h2>


<input
    type="text"
    placeholder="Search by title or location"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<br /><br />


<select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>

    <option value="">
        All Status
    </option>

    <option value="Pending">
        Pending
    </option>

    <option value="Resolved">
        Resolved
    </option>

</select>

<br /><br />


{
    issues

    .filter((issue) => {

        const matchesSearch =

            issue.title
            .toLowerCase()
            .includes(search.toLowerCase())

            ||

            issue.location
            .toLowerCase()
            .includes(search.toLowerCase());


        const matchesStatus =

            statusFilter === ""

            ||

            issue.status === statusFilter;


        return matchesSearch && matchesStatus;

    })

    .map((issue) => (

        <div
            className="issue-card"
            key={issue._id}
        >

            <h3>{issue.title}</h3>

            <p>{issue.description}</p>

            <p>
                Category: {issue.category}
            </p>

            <p>
                Location: {issue.location}
            </p>
            <p>
                Created: {new Date(issue.createdAt).toLocaleDateString("en-GB")}
            </p>

            <p>

                Status:

                <span
                    style={{
                        color:
                            issue.status === "Resolved"
                            ? "green"
                            : "red",

                        fontWeight: "bold"
                    }}
                >

                    {" "}{issue.status}

                </span>

            </p>

            <br />

            {
                localStorage.getItem("role") === "admin" && (

                    <>
                        <button
                            onClick={() => updateStatus(issue._id)}
                        >
                            Mark Resolved
                        </button>

                        <button
                            onClick={() => deleteIssue(issue._id)}
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "crimson"
                            }}
                        >
                            Delete Issue
                        </button>
                    </>
                )
            }

            <br /><br />

            {
                issue.image && (
                    <img
                        src={`https://smart-community-management-system.onrender.com/${issue.image}`}
                        alt="issue"
                    />
                )
            }

        </div>
    ))
}

        </div>
    );
}

export default Dashboard;