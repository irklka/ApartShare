import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (status) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const initialValue = localStorage.getItem('auth');
    const [authenticated, setAuthenticated] = useState(initialValue);

    // console.log(`authenticated - ${authenticated}`);

    // // ********** Using custom http hook for check ********** //
    // const { sendRequest: checkAuthentication } = useHttp();
    // // ********************************************* //

    // ********** Using custom http hook for logout ********** //
    const url = 'https://localhost:7209/api/User/logout';

    const logoutResponse = (res) => {
        console.log(res);
    }

    const { sendRequest: logoutUser } = useHttp();
    // ********************************************* //

    // useEffect(() => {
    //     console.log('checked!!!');

    //     const url = 'https://localhost:7209/api/User/check';

    //     const authContextStatus = data => {
    //         data.message && setAuthenticated(data.message);
    //     };

    //     checkAuthentication({
    //         url: url,
    //         credentials: 'include'
    //     }, authContextStatus);
    // }, [checkAuthentication]);


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
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }, logoutResponse);
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