import { useEffect } from "react";
import BookingsCard from "../components/Cards/BookingCard";
import classes from "./MyBookings.module.css"
import useHttp from "../hooks/use-http";

const MyBookings = () => {
    // ********** Using custom http hook for getting guests data ********** //
    const url = `https://localhost:7209/api/Request/myRequests`;

    const myRequestData = (data) => {
        console.log(data);
    }

    const { isLoading, sendRequest: getmyRequestData } = useHttp();
    // ********************************************* //

    useEffect(() => {
        console.log('myRequest Data - useEffect');

        getmyRequestData({
            url: url,
            credentials: 'include',
        }, myRequestData);
    }, [getmyRequestData]);

    return <div className="page">
        <div className="container">
            <h1 className="page-heading">My bookings</h1>
            {isLoading ? <p className={classes.loadingMessage}>Page is loading, please wait few seconds...</p> :
                <div className={`grid grid--2-cols ${classes['bookings-container']}`}>
                    <BookingsCard />
                    <BookingsCard />
                    <BookingsCard />
                </div>
            }
        </div>
    </div>
}

export default MyBookings;