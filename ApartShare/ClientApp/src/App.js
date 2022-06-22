import { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Layout/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import MyGuests from "./pages/MyGuests";
import MyBookings from "./pages/MyBookings";
import Search from "./pages/Search";
import AuthContext from "./store/auth-context";
import avatar from './images/avatar.jpg'
import useHttp from "./hooks/use-http";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    id: '',
    fullName: '',
    username: '',
    email: '',
    image: avatar,
    usersApartment: null
  });

  // ********** Using custom http hook for fetching user data ********** /
  const { isLoading, sendRequest: fetchUserData } = useHttp();
  // ********************************************* //

  console.log(isLoggedIn);

  // const isLoggedIn = true;


  useEffect(() => {
    if (isLoggedIn) {
      console.log('App.js user info - effect');

      const url = 'https://localhost:7209/api/User/profile';

      const setProfileData = data => {
        console.log(data);
        console.log('Profile Info useEffect Called from App.js');
        setUserData(prev => {
          return {
            ...prev,
            id: data.id,
            fullName: data.name,
            username: data.loginName,
            email: data.email,
            image: data.imageBase64 ? data.imageBase64 : prev.image,
            usersApartment: data.myApartment
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
    }
  }, [fetchUserData, isLoggedIn]);


  return <div>

    {isLoggedIn && <Header
      username={userData.username}
    />}

    <main>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        {isLoggedIn && <Route path="/profile" element={<UserProfile
          loadingState={isLoading}
          image={userData.image}
          fullName={userData.fullName}
          username={userData.username}
          email={userData.email}
          Appartment={userData.usersApartment}
        />} />}
        {isLoggedIn && <Route path="/search" element={<Search />} />}
        {isLoggedIn && <Route path="/my-guests" element={<MyGuests />} />}
        {isLoggedIn && <Route path="/my-bookings" element={<MyBookings />} />}
        <Route path='*' element={<Navigate replace to={isLoggedIn ? '/search' : '/'} />} />
      </Routes>
    </main>

  </div>
}

export default App;