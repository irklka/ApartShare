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

    return <div className="flex-column card">
        <img className="card-img" src={props.img} alt="House image" />
        <div className="flex-column card-info">
            <div className="location-info">
                <p>{props.address}, {props.city}</p>
                <div>
                    <span>{props.distance}m to center</span>
                    <span>{props.bedsNumber} beds</span>
                </div>
            </div>
            <div className="card-bot">
                <p className="date">{fromDate} - {dueDate}</p>
                <div className={`card-status--div
                ${classes[`booking-card--status-${status}`]}`}>
                    <ion-icon name="radio-button-on-outline"></ion-icon>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    </div>
}

export default BookingsCard;