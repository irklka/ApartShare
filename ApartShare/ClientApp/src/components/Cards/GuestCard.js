import { useEffect, useState } from "react";
import avatar from "../../images/avatar.jpg";
import classes from "./GuestCard.module.css";
import format from "date-fns/format";
import useHttp from "../../hooks/use-http";


const GuestCard = (props) => {
    const [status, setStatus] = useState(null);
    console.log(props.id);

    // ********** Using custom http hook for booking apartment ********** //
    const url = `https://localhost:7209/api/Request/changeRequestStatus?id=${props.id}&status=${status}`;

    const acceptOrDeclineRequest = (data) => {
        console.log(data);
        // alert("Request has been sent");
    }

    const { sendRequest: changeRequestStatus } = useHttp();
    // ********************************************* //

    const onAcceptHandler = event => {
        setStatus(1);
    }

    const onDeclineHandler = event => {
        setStatus(2);
    }

    useEffect(() => {
        if (status !== null) {
            changeRequestStatus({
                url: url,
                method: 'POST',
                credentials: 'include',
            }, acceptOrDeclineRequest);
        }
    }, [status])


    const fromDate = format(Date.parse(props.fromDate), 'MM/dd/yyyy');
    const dueDate = format(Date.parse(props.dueDate), 'MM/dd/yyyy');

    return <div className={`${classes['guest-card']}`}>
        <img className={classes['guest-card--img']} src={props?.img || avatar} alt="flex's image" />
        <div className={classes['guest-card--desc']}>
            <p>{props.name}</p>
            <div>
                <p>Booking date</p>
                <p className={classes['guest-card--date']}>{fromDate} - {dueDate}</p>
            </div>
        </div>
        <div className={classes['guest-card--last-part']}>
            <div className={classes['guest-card--btns']}>
                <button onClick={onAcceptHandler} className="btn btn--full">Accept</button>
                <button onClick={onDeclineHandler} className="btn btn--outline">Decline</button>
            </div>
        </div>
    </div>
}

export default GuestCard