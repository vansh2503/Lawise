// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${config.apiBaseUrl}/login`, { email, password });
            const userData = { token: res.data.token, role: res.data.role };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true; // Indicate success
        } catch (err) {
            console.error("Login Failed", err);
            return false; // Indicate failure
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const res = await axios.post(`${config.apiBaseUrl}/signup`, { name, email, password, role });

            const userData = { token: res.data.token, role: res.data.role };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true; // Indicate success
        } catch (err) {
            console.error("Signup Failed", err);
            return false; // Indicate failure
        }
    };

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) setUser(savedUser);
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
