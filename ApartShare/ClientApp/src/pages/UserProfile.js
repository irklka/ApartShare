import { Fragment } from "react";
import Profile from '../components/Profile/Profile';
import Appartment from '../components/Profile/Apartment';
import classes from './UserProfile.module.css';


const UserProfile = (props) => {
    return <div className='page'>
        {props.loadingState ? <p className={classes.loadingMessage}>Page is loading, please wait for few seconds...</p> :
            <Fragment>
                <Profile
                    image={props.image}
                    fullName={props.fullName}
                    username={props.username}
                    email={props.email}
                />
                <Appartment
                    Apartment={props.Apartment}
                />
            </Fragment>}
    </div>
}

export default UserProfile;