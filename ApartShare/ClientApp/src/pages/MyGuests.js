import { useEffect } from "react";
import GuestCard from "../components/Cards/GuestCard";
import classes from "./MyGuests.module.css"
import useHttp from "../hooks/use-http";

const MyGuests = () => {
    // ********** Using custom http hook for getting guests data ********** //
    const url = `https://localhost:7209/api/Request/myGuests`;

    const guestData = (data) => {
        console.log(data);
    }

    const { isLoading, sendRequest: getGuestData } = useHttp();
    // ********************************************* //

    useEffect(() => {
        console.log('Guest Data - useEffect');

        getGuestData({
            url: url,
            credentials: 'include',
        }, guestData);
    }, [getGuestData]);

    return <div className="page">
        <div className="container">
            <h1 className='page-heading'>My guests</h1>
            {isLoading ? <p className={classes.loadingMessage}>Page is loading, please wait few seconds...</p> :
                <GuestCard />
            }
        </div>

    </div>
}

export default MyGuests