import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('message');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token // This converts truthy or falsy value to a true or false boolean value

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('message', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('message');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;