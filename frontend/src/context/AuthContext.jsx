import { createContext,useContext,useEffect,useState,} from "react";
import API from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check logged-in user
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const storedUser =
            localStorage.getItem("user");

        if (token && storedUser) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }

        }

        setLoading(false);

    }, []);

    // Login
    const login = async (email, password) => {

        const { data } = await API.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);

        return data;

    };

    // Register
    const register = async (
        name,
        email,
        password
    ) => {

        const { data } = await API.post(
            "/auth/register",
            {
                name,
                email,
                password,
            }
        );

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);

        return data;

    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}