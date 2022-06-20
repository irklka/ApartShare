import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import classes from './Header.module.css';
import AuthContext from '../../store/auth-context';

const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>

const arrowUp = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
</svg>

const Header = () => {
    const { logout } = useContext(AuthContext);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const cabinetClickHandler = event => {
        setToggleDropdown(prev => !prev);
    }

    const logoutHandler = () => {
        logout();
    }

    const cabinetIsVisible = toggleDropdown ? 'visible' : '';

    return <header className={`${classes.header} flex`}>
        <div>
            <p>Username</p>
        </div>
        <nav>
            <ul className='flex'>
                <li><Link to={'/search'} className='btn btn--outline anchor'>Search</Link></li>
                <li>
                    <div className={classes.dropdown}>
                        <button className={`btn btn--outline ${classes['btn--cabinet']}`}
                            onClick={cabinetClickHandler}
                        >
                            <span>Cabinet</span>
                            {toggleDropdown ? arrowUp : arrowDown}
                        </button>
                        <div className={cabinetIsVisible}>
                            <ul>
                                <li><Link to={'/profile'} className={classes['dropdown-anchor']} href='#'>Profile</Link></li>
                                <li><Link to={'/my-guests'} className={classes['dropdown-anchor']} href='#'>My guests</Link></li>
                                <li><Link to={'/my-bookings'} className={classes['dropdown-anchor']} href='#'>My bookings</Link></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li><a className='btn btn--outline anchor' onClick={logoutHandler} href='#'>Log out</a></li>
            </ul>
        </nav>
    </header >
}

export default Header;