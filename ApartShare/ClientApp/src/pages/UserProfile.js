import React, { useState, useEffect, Fragment } from 'react';
import Profile from '../components/Profile/Profile';
import Appartment from '../components/Profile/Appartment';
import avatar from './../images/avatar.jpg'
import useHttp from '../hooks/use-http';
import classes from './UserProfile.module.css';


const UserProfile = () => {
    const [userData, setUserData] = useState({
        id: '',
        fullName: '',
        username: '',
        email: '',
        image: avatar,
        usersAppartment: null
    });

    // ********** Using custom http hook for fetching user data ********** /
    const { isLoading, sendRequest: fetchUserData } = useHttp();
    // ********************************************* //

    useEffect(() => {
        console.log('UserProfile - effect');

        const url = 'https://localhost:7209/api/User/profile';

        const setProfileData = data => {
            console.log(data);
            console.log('Profile useEffect Called');
            setUserData(prev => {
                return {
                    ...prev,
                    id: data.id,
                    fullName: data.name,
                    username: data.loginName,
                    email: data.email,
                    image: data.imageBase64,
                    usersAppartment: data.myApartment
                }
            });
        }

        fetchUserData({
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }, setProfileData);
    }, [fetchUserData]);

    return <div className='page'>
        {isLoading ? <p className={classes.loadingMessage}>Page is loading, please wait few seconds...</p> :
            <React.Fragment>
                <Profile
                    image={userData.image}
                    fullName={userData.fullName}
                    username={userData.username}
                    email={userData.email}
                />
                <Appartment
                    Appartment={userData.usersAppartment}
                />
            </React.Fragment>}
    </div>
}

export default UserProfile;