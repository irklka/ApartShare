import Profile from '../components/Profile/Profile';
import Appartment from '../components/Profile/Appartment';
import useHttp from '../hooks/use-http';
import { useEffect } from "react";


const UserProfile = () => {

    // ********** Using custom http hook ********** /
    const { sendRequest } = useHttp();
    // ********************************************* //

    useEffect(() => {
        const url = 'https://localhost:7209/api/User/profile';

        const logProfileInfo = data => {
            console.log(data);
        }

        sendRequest({
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }, logProfileInfo);
    }, [sendRequest]);

    return <div className='page'>
        <Profile />
        <Appartment />
    </div>
}

export default UserProfile;