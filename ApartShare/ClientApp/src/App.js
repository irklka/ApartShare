import { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Layout/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import MyGuests from "./pages/MyGuests";
import MyBookings from "./pages/MyBookings";
import Search from "./pages/Search";
import AuthContext from "./store/auth-context";

const App = () => {
  // const { isLoggedIn } = useContext(AuthContext);

  // console.log(isLoggedIn);

  return <div>

    <Header />

    <main>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-guests" element={<MyGuests />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        {/* <Route path='*' element={<Navigate replace to={isLoggedIn ? '/search' : '/'} />} /> */}
      </Routes>
    </main>

  </div>
}

export default App;