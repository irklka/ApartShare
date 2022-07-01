import { useState, useCallback, useContext } from "react";
import AuthContext from "../store/auth-context";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { logout } = useContext(AuthContext);

    const sendRequest = useCallback(async (requestConfig, applyData = null) => {
        setIsLoading(true);

        let receivedData;

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : { 'Content-Type': 'application/json' },
                credentials: requestConfig.credentials ? requestConfig.credentials : 'omit',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            receivedData = await response.json();
        }
        catch (err) {
            if (err.message === "session is expired.") {
                logout();
            }
            else {
                alert(err.message);
            }
            return;
        }
        setIsLoading(false);
        !!applyData && applyData(receivedData);
    }, []);

    return {
        isLoading,
        sendRequest
    }
}

export default useHttp;