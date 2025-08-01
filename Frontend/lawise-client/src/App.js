// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext'; // Import AuthProvider only
import Signup from './components/signup';
import Login from './components/login';
import LandingPage from './components/landingpage';
import TeamPage from './components/teampage';
import ClientDashboard from "./components/clientdashboard";
import LawyerDashboard from "./components/lawyerdashboard"; // Import Lawyer Dashboard
import AdminDashboard from "./components/admindashboard"; // Import Admin Dashboard
import AuthContext from './context/authcontext'; // Import AuthContext for useContext

const App = () => {
    const { user } = useContext(AuthContext); // Get user data from AuthContext

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/client-dashboard" element={<ClientDashboard />} />
                    <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    {/* Redirect based on user role */}
                    <Route path="/dashboard" element={user ? (
                        user.role.toLowerCase() === 'admin' ? <Navigate to="/admin-dashboard" /> :
                        user.role.toLowerCase() === 'lawyer' ? <Navigate to="/lawyer-dashboard" /> :
                        <Navigate to="/client-dashboard" />
                    ) : (
                        <Navigate to="/login" />
                    )} />
                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
