import { useEffect, useState } from "react";
import GuestCard from "../components/Cards/GuestCard";
import classes from "./MyGuests.module.css"
import useHttp from "../hooks/use-http";

const MyGuests = () => {
    const [myGuests, setMyGuests] = useState([]);

    // ********** Using custom http hook for getting guests data ********** //
    const url = `https://localhost:7209/api/Request/myGuests`;

    const guestData = (data) => {
        console.log(data);
        setMyGuests(data);
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

    const loadingElement = <p className={classes.loadingMessage}>Page is loading, please wait few seconds...</p>;

    const resultElement = myGuests.length === 0 ?
        <p className={classes.loadingMessage}>There are no guest requests at the moment</p> :
        myGuests.map(myGuest => {
            return <GuestCard
                key={myGuest.id}
                id={myGuest.id}
                img={myGuest.imageBase64}
                name={myGuest.name}
                fromDate={myGuest.fromDate}
                dueDate={myGuest.dueDate}
            />
        });

    return <div className="page">
        < div className="container" >
            <h1 className='page-heading'>My guests</h1>
            {isLoading ? loadingElement : resultElement}
        </div >

    </div >
}

export default MyGuests