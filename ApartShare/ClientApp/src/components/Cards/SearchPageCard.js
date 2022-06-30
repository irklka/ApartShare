import { useState } from 'react';
import classes from './SearchPageCard.module.css';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import format from 'date-fns/format';


const SearchPageCart = (props) => {
    const [toggle, setToggle] = useState(false);

    // ********** Marking users's apartment in search results ********** //
    const usersCard = props.hostId === props.guestId;
    const usersApartmentClass = !usersCard ? classes['users-apartment-note'] : `${classes['users-apartment-note']} visible`;
    // *********************************** //

    // ********** Using custom input hook ********** //
    const {
        value: enteredFromDate,
        isValid: enteredFromDateIsValid,
        valueChangeHandler: fromDateChangeHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDueDate,
        isValid: enteredDueDateIsValid,
        valueChangeHandler: dueDateChangeHandler,
    } = useInput(value => value.trim() !== '');
    // ********************************************* //

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

    const buttonAvailable = status === "available" && !usersCard ? true : false;

    const buttonAvailabilityClass = buttonAvailable ? '' : classes["btn--unavailable"];
    // *********************************** //

    // ********** Using custom http hook for booking apartment ********** //
    const url = `https://localhost:7209/api/Request/createRequest`;

    const bookResult = (data) => {
        console.log(data);
        alert("Request has been sent");
        setToggle(prev => !prev);
    }

    const { sendRequest: bookApartment } = useHttp();
    // ********************************************* //

    const bookApartmentHandler = event => {
        if (!enteredFromDateIsValid || !enteredDueDateIsValid) {
            alert("Please enter Date range for booking");
            return;
        }

        if (enteredDueDate < enteredFromDate) {
            alert("Please enter valid date range");
            return;
        }

        bookApartment({
            url: url,
            method: 'POST',
            body: {
                city: props.city,
                fromDate: enteredFromDate,
                dueDate: enteredDueDate,
                hostId: props.hostId,
            },
            credentials: "include",
        }, bookResult)
    }

    // ********** Showing date logic ********** //
    let availabilityStatus;

    if (props.fromDate === null) {
        availabilityStatus = "Available for booking"
    } else {
        const fromDate = format(Date.parse(props.fromDate), 'MM/dd/yyyy');
        const dueDate = format(Date.parse(props.dueDate), 'MM/dd/yyyy');
        availabilityStatus = `${fromDate} - ${dueDate}`;
    }
    // ********************************************* //

    return <div className="flex-column card">
        <img className="card-img" src={props.img} alt="House image" />
        <div className="flex-column card-info">
            <div className="location-info">
                <p>{`${props.city}, ${props.address}`} <span className={usersApartmentClass}>User's apartment</span></p>
                <div>
                    <span>{`${props.distance}m to center`}</span>
                    <span>{`${props.beds} beds`}</span>
                </div>
            </div>
            <div className="card-bot">
                <p className="date">{availabilityStatus}</p>
                <div className={`card-status--div
                ${classes[`searchResult-card--status-${status}`]}`}>
                    <ion-icon name="radio-button-on-outline"></ion-icon>
                    <span>{status}</span>
                </div>
            </div>
            <div className={classes['result-card--bot']}>
                <button
                    onClick={() => setToggle(prev => {
                        return !prev;
                    })}
                    disabled={status === 'available' && !usersCard ? false : true}
                    className={`btn btn--full ${classes['btn--book-now']} ${buttonAvailabilityClass}`}>
                    Book now
                </button>
            </div>
            {toggle && <div className="flex-column">
                <div className={classes['searchResult-card--input-div']}>
                    <div>
                        <label>From date</label>
                        <input onChange={fromDateChangeHandler} value={enteredFromDate} type="date" />
                    </div>
                    <div>
                        <label>Due date</label>
                        <input onChange={dueDateChangeHandler} value={enteredDueDate} type="date" />
                    </div>
                </div>
                <div className={classes['result-card--bot']}>
                    <button
                        onClick={bookApartmentHandler}
                        className={`btn btn--full ${classes['btn--book-now']} ${buttonAvailabilityClass}`}
                    >Send request</button>
                </div>
            </div>}
        </div>
    </div>
}

export default SearchPageCart;