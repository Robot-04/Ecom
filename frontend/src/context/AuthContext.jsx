import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken) setToken(storedToken);
            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            }
        } catch {
            localStorage.clear();
        } finally {
            setReady(true);
        }
    }, []);

    const login = (newToken, userData) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, ready, login, logout }}>
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

