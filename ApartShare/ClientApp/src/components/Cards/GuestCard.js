import { useEffect } from "react";
import image from "../../images/people/user-2.jpg";
import classes from "./GuestCard.module.css";


const GuestCard = () => {
    return <div className={`${classes['guest-card']}`}>
        <img className={classes['guest-card--img']} src={image} alt="flex's image" />
        <div className={classes['guest-card--desc']}>
            <p>Jane Collins</p>
            <blockquote>
                Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </blockquote>
        </div>

        <div className={classes['guest-card--last-part']}>
            <p className={classes['guest-card--date']}>date</p>
            <div className={classes['guest-card--btns']}>
                <button className="btn btn--full">Accept</button>
                <button className="btn btn--outline">Decline</button>
            </div>
        </div>
    </div>
}

export default GuestCard