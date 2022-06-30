import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import useInput from '../hooks/use-input';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // ********** Using custom input hook ********** //
    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        hasError: usernameInputHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(value => value.length > 6);
    // ********************************************* //

    // ********** Using custom http hook for user authentication ********** //
    const url = 'https://localhost:7209/api/User/login'

    const loginData = data => {
        login(true);
        navigate('/search', { replace: true });
    }

    const { sendRequest } = useHttp();
    // ********************************************* //

    let formIsValid = false;

    if (enteredUsernameIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const loginHandler = event => {
        event.preventDefault();

        usernameBlurHandler();
        passwordBlurHandler();

        // validation logic
        if (!formIsValid) {
            return
        }

        // Here will be login request
        sendRequest({
            url: url,
            method: 'POST',
            credentials: 'include',
            body: {
                login: enteredUsername,
                password: enteredPassword,
            }
        }, loginData);
    }

    // ********** Alerting invalid input errors ********** //
    const invalidUsernameClass = usernameInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidPasswordClass = passwordInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    // ********************************************* //

    return (
        <div className={`wrapper ${classes['login-background']}`}>
            <div className={'form-container form-container-settings'}>
                <h1>Log in</h1>
                <form>
                    <div className='input-div'>
                        <input
                            onBlur={usernameBlurHandler}
                            onChange={usernameChangeHandler}
                            value={enteredUsername}
                            type='text'
                            placeholder="Username"
                        />
                        <p className={invalidUsernameClass}>Please enter valid username</p>
                    </div>
                    <div className='input-div'>
                        <input onBlur={passwordBlurHandler}
                            onChange={passwordChangeHandler}
                            value={enteredPassword}
                            type='password'
                            placeholder="Password"
                        />
                        <p className={invalidPasswordClass}>Please enter at least 7 characters</p>
                    </div>
                    <div className='flex'>
                        <Link className='btn btn--outline anchor' to={'/register'}>Register</Link>
                        <button onClick={loginHandler} className='btn btn--full'>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;