import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false);

    // // ********** Using custom http hook ********** //
    // const { sendRequest } = useHttp();
    // // ********************************************* //

    // // useEffect(() => {
    // //     const url = 'https://localhost:7209/api/User/check';

    // //     const authContextStatus = data => {
    // //         setAuthenticated(data.message);
    // //     };

    // //     sendRequest({
    // //         url: url,
    // //         credentials: 'include'
    // //     }, authContextStatus);
    // // }, [sendRequest]);


    const userIsLoggedIn = !!authenticated;

    const loginHandler = (token) => {
        setAuthenticated(true);
        // localStorage.setItem('message', token);
    }

    const logoutHandler = () => {
        setAuthenticated(null);
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