import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    // const [loading, setLoading] = useState(true)

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            { children }
        </AuthContext.Provider>   

    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context;
};

