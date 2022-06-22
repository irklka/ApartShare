import classes from './SearchPageCart.module.css';

const status = 'unavailable';

const SearchPageCart = (props) => {

    const bookApartmentHandler = event => {
        console.log('Apartment booked!');
    }

    const buttonAvailable = status === "available" ? true : false;

    const buttonAvailabilityClass = buttonAvailable ? '' : classes["btn--unavailable"];

    return <div className={`${classes['flex-column']} ${classes['result-card']}`}>
        <img className={classes['result-card--img']} src={props.img} alt="House image" />
        <div className={`${classes['flex-column']} ${classes['result-card--info']}`}>
            <div className={classes['location-info']}>
                <p>{props.address}</p>
                <div>
                    <span>{`${props.distance} to center`}</span>
                    <span>{`${props.beds} beds`}</span>
                </div>
            </div>
            <p className={classes['result-card--desc']}>{props.description}</p>
            <div className={classes['searchResult-card--bot']}>
                <p className={classes.date}>12.02.2022  - 15.02.2022</p>
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