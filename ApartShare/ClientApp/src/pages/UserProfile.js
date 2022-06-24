import React, { useState, useEffect, Fragment } from 'react';
import Profile from '../components/Profile/Profile';
import Appartment from '../components/Profile/Apartment';
// import avatar from './../images/avatar.jpg'
import useHttp from '../hooks/use-http';
import classes from './UserProfile.module.css';


const UserProfile = (props) => {

    return <div className='page'>
        {props.loadingState ? <p className={classes.loadingMessage}>Page is loading, please wait few seconds...</p> :
            <React.Fragment>
                <Profile
                    image={props.image}
                    fullName={props.fullName}
                    username={props.username}
                    email={props.email}
                />
                <Appartment
                    Apartment={props.Apartment}
                />
            </React.Fragment>}
    </div>
}

export default UserProfile;