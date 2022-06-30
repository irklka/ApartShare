import classes from './BookingCard.module.css';
import format from 'date-fns/format';


const BookingsCard = (props) => {
    // ******* Apartment status logic ******* //
    let status;

    switch (props.status) {
        case 0:
            status = "pending";
            break;
        case 1:
            status = "accepted";
            break;
        case 2:
            status = "declined"
            break;
        default:
            break;
    }
    // *********************************** //

    const fromDate = format(Date.parse(props.fromDate), 'MM/dd/yyyy');
    const dueDate = format(Date.parse(props.dueDate), 'MM/dd/yyyy');

    return <div className={`${classes['flex-column']} ${classes['booking-card']}`}>
        <img className={classes['booking-card--img']} src={props.img} alt="House image" />
        <div className={`${classes['flex-column']} ${classes['booking-card--info']}`}>
            <div className={classes['location-info']}>
                <p>{props.address}, {props.city}</p>
                <div>
                    <span>{props.distance}m to center</span>
                    <span>{props.bedsNumber} beds</span>
                </div>
            </div>
            <div className={classes['booking-card--bot']}>
                <p className={classes.date}>{fromDate} - {dueDate}</p>
                <div className={`${classes['booking-card--status-div']}
                ${classes[`booking-card--status-${status}`]}`}>
                    <ion-icon name="radio-button-on-outline"></ion-icon>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    </div>
}

export default BookingsCard;