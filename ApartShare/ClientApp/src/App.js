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
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  // const isLoggedIn = true;

  return <div>

    {isLoggedIn && <Header />}

    <main>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        {isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
        {isLoggedIn && <Route path="/search" element={<Search />} />}
        {isLoggedIn && <Route path="/my-guests" element={<MyGuests />} />}
        {isLoggedIn && <Route path="/my-bookings" element={<MyBookings />} />}
        <Route path='*' element={<Navigate replace to={isLoggedIn ? '/search' : '/'} />} />
      </Routes>
    </main>

  </div>
}

export default App;