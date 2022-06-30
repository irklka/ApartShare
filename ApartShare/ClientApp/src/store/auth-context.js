import React, { useState } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (status) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const initialValue = localStorage.getItem('auth');
    const [authenticated, setAuthenticated] = useState(initialValue);

    // ********** Using custom http hook for logout ********** //
    const url = 'https://localhost:7209/api/User/logout';

    const { sendRequest: logoutUser } = useHttp();
    // ********************************************* //

    const userIsLoggedIn = !!authenticated;

    const loginHandler = (status) => {
        setAuthenticated(status);
        localStorage.setItem('auth', status)
    }

    const logoutHandler = () => {
        setAuthenticated(null);
        localStorage.removeItem('auth');

        logoutUser({
            url: url,
            method: 'POST',
            credentials: 'include'
        });
    }

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;