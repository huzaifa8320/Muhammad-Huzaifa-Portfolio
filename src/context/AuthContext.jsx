import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { message, notification } from "antd";
import { AppRoutes } from "../constant/Constant";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState('null');
    const [token, setToken] = useState(Cookies.get("token") || null);

    const openNotification = (type, message, description) => {
        notification[type]({ message, description, placement: "topRight" });
    };

    const getUser = async () => {
        await axios.get(AppRoutes.getMyInfo, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
            .then((res) => {
                setUser(res?.data?.data);
            })
            .catch((err) => {
                console.log(err)
                openNotification("error", "Error", "Something Went Wrong!");
            });
    };
    useEffect(() => {
        if (token) {
            console.log("Token available. Triggering getUser.");
            getUser();
        } else {
            console.log("No token detected. Skipping getUser.");
            setUser(null)
        }
    }, [token]);

    const updateToken = (newToken) => {
        Cookies.set("token", newToken);
        setToken(newToken);
    };


    const logOut = () => {
        Cookies.remove("token");
        setUser(null);
        message.success("Logout Successful");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, updateToken, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}