import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages /Login.jsx";
import Register from "./pages /Register.jsx";
import Dashboard from "./pages /Dashboard.jsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AISuggestion from "./pages /AISuggestion.jsx";
import Sustainability from "./pages /Sustainability.jsx";
import Notifications from "./pages /Notifications.jsx";

import Profile from "./pages /Profile.jsx";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ai"
                    element={
                        <ProtectedRoute>
                            <AISuggestion />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sustainability"
                    element={
                        <ProtectedRoute>
                            <Sustainability />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={<Notifications />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;