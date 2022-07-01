import { Fragment } from "react";
import Profile from '../components/Profile/Profile';
import Appartment from '../components/Profile/Apartment';


const UserProfile = (props) => {
    return <div className='page'>
        {props.loadingState ? <p className="loadingAndResultMessage">Page is loading, please wait for few seconds...</p> :
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