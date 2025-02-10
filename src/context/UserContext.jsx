import { createContext, useState, useEffect } from 'react';

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [UserToken, setUserToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
        }
    }, []);
    useEffect(() => {
        if (UserToken) {
            localStorage.setItem('userToken', UserToken);
        } else {
            localStorage.removeItem('userToken');
        }
    }, [UserToken]);

    return (
        <UserContext.Provider value={{ UserToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
}
