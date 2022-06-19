import { useState } from "react";


const useHttp = (requestConfig, applyData = null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);

        let receivedData;

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Request failed!!!!!!!!!!!!');
            }

            receivedData = await response.json();
        }
        catch (err) {
            setError(err)
        }

        setIsLoading(false);

        if (applyData != null) {
            applyData(receivedData);
        }
    }

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;