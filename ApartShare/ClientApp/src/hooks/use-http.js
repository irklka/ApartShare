import { useState, useCallback } from "react";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (requestConfig, applyData = null) => {
        setIsLoading(true);

        let receivedData;

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                credentials: requestConfig.credentials ? requestConfig.credentials : 'omit',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });

            console.log(response);

            if (!response.ok) {
                const error = await response.json();
                console.log(error.message);
                throw new Error(error.message);
            }

            receivedData = await response.json();
        }
        catch (err) {
            alert(err.message);
            return;
        }
        console.log('responseOK');
        setIsLoading(false);
        applyData(receivedData);
    }, []);

    return {
        isLoading,
        sendRequest
    }
}

export default useHttp;