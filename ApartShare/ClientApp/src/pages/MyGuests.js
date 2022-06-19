import GuestCard from "../components/Cards/GuestCard";
import classes from "./MyGuests.module.css"

const MyGuests = () => {
    return <div className="page">
        <div className="container">
            <h1 className='page-heading'>My guests</h1>
            <GuestCard />
            <GuestCard />
            <GuestCard />
            <GuestCard />
        </div>

    </div>
}

export default MyGuests