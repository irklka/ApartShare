import { useEffect, useState } from "react";
import BookingsCard from "../components/Cards/BookingCard";
import useHttp from "../hooks/use-http";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    // ********** Using custom http hook for getting guests data ********** //
    const url = `https://localhost:7209/api/Request/myRequests`;

    const myRequestData = (data) => {
        setBookings(data);
    }

    const { isLoading, sendRequest: getmyRequestData } = useHttp();
    // ********************************************* //

    useEffect(() => {
        getmyRequestData({
            url: url,
            credentials: 'include',
        }, myRequestData);
    }, [getmyRequestData]);

    const loadingElement = <p className="loadingAndResultMessage">Page is loading, please wait for few seconds...</p>;

    const resultElement = bookings.length === 0 ?
        <p className="loadingAndResultMessage">There are no booking requests at the moment</p> :
        <div className="grid grid--2-cols card-container--gap">
            {bookings.map(booking => {
                return <BookingsCard
                    key={booking.id}
                    id={booking.id}
                    address={booking.address}
                    bedsNumber={booking.bedsNumber}
                    city={booking.city}
                    distance={booking.distanceToCenter}
                    fromDate={booking.fromDate}
                    dueDate={booking.dueDate}
                    img={booking.imageBase64}
                    status={booking.status}
                />
            })}
        </div>;

    return <div className="page">
        <div className="container">
            <h1 className="page-heading">My bookings</h1>
            {isLoading ? loadingElement : resultElement}
        </div>
    </div>
}

export default MyBookings;