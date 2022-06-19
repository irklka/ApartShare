import image from '../../images/houses/house-1.jpg';
import classes from './BookingCard.module.css';

const status = 'accepted';

const BookingsCard = () => {
    return <div className={`${classes['flex-column']} ${classes['booking-card']}`}>
        <img className={classes['booking-card--img']} src={image} alt="House image" />
        <div className={`${classes['flex-column']} ${classes['booking-card--info']}`}>
            <div className={classes['location-info']}>
                <p>Address, location</p>
                <div>
                    <span>500m to center</span>
                    <span>2 beds</span>
                </div>
            </div>
            <p className={classes['booking-card--desc']}>Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className={classes['booking-card--bot']}>
                <p className={classes.date}>12.02.2022  - 15.02.2022</p>
                <div className={`${classes['booking-card--status-div']}
                ${classes[`booking-card--status-${status}`]}`}>
                    <ion-icon name="radio-button-on-outline"></ion-icon>
                    <span>Pending</span>
                </div>
            </div>
        </div>
    </div>
}

export default BookingsCard;