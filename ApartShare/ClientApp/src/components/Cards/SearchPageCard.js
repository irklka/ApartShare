import classes from './SearchPageCard.module.css';
import useHttp from '../../hooks/use-http';



const SearchPageCart = (props) => {

    // ******* Apartment status logic ******* //
    let status;

    switch (props.status) {
        case 0:
            status = "available";
            break;
        case 1:
            status = "unavailable";
            break;
        default:
            break;
    }

    const buttonAvailable = status === "available" ? true : false;

    const buttonAvailabilityClass = buttonAvailable ? '' : classes["btn--unavailable"];
    // *********************************** //

    // ********** Using custom http hook for booking apartment ********** //
    const url = `https://localhost:7209/api/Request/createRequest?HostId=${props.hostId}&GuestId=${props.guestId}`;

    const bookResult = (data) => {
        console.log(data);
    }

    const { sendRequest: bookApartment } = useHttp();
    // ********************************************* //


    const bookApartmentHandler = event => {
        console.log('Apartment booked!');
        console.log(props.city);
        console.log(props.fromDate);
        console.log(props.dueDate);

        bookApartment({
            url: url,
            method: 'POST',
            body: {
                city: props.city,
                fromDate: props.fromDate,
                dueDate: props.dueDate,
            },
            credentials: "include",
        }, bookResult)
    }


    return <div className={`${classes['flex-column']} ${classes['result-card']}`}>
        <img className={classes['result-card--img']} src={props.img} alt="House image" />
        <div className={`${classes['flex-column']} ${classes['result-card--info']}`}>
            <div className={classes['location-info']}>
                <p>{`${props.city}, ${props.address}`}</p>
                <div>
                    <span>{`${props.distance} to center`}</span>
                    <span>{`${props.beds} beds`}</span>
                </div>
            </div>
            {/* <p className={classes['result-card--desc']}>{props.description}</p> */}
            <div className={classes['searchResult-card--bot']}>
                <p className={classes.date}>{`${props.fromDate} - ${props.dueDate}`}</p>
                <div className={`${classes['searchResult-card--status-div']}
                ${classes[`searchResult-card--status-${status}`]}`}>
                    <ion-icon name="radio-button-on-outline"></ion-icon>
                    <span>{status}</span>
                </div>
            </div>
            <div className={classes['result-card--bot']}>
                <button onClick={bookApartmentHandler} disabled={status === 'available' ? false : true} className={`btn btn--full ${classes['btn--book-now']} ${buttonAvailabilityClass}`}>Book now</button>
            </div>
        </div>
    </div>
}

export default SearchPageCart;