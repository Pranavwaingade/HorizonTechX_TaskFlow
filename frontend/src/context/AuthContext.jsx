import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);

    }, []);

    // Login
    const login = (userData, jwtToken) => {

        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);

    };

    // Logout
    const logout = () => {

        setUser(null);
        setToken("");

        localStorage.removeItem("user");
        localStorage.removeItem("token");

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);