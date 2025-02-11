import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [UserToken, setUserToken] = useState(localStorage.getItem("UserToken"));

    useEffect(() => {
        const token = localStorage.getItem("UserToken");
        if (token) {
            setUserToken(token);
        }
    }, []);

    return (
        <UserContext.Provider value={{ UserToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
}
