import BookingsCard from "../components/Cards/BookingCard";
import classes from "./MyBookings.module.css"

const MyBookings = () => {
    return <div className="page">
        <div className="container">
            <h1 className="page-heading">My bookings</h1>
            <div className={`grid grid--2-cols ${classes['bookings-container']}`}>
                <BookingsCard />
                <BookingsCard />
                <BookingsCard />
            </div>
        </div>
    </div>
}

export default MyBookings;