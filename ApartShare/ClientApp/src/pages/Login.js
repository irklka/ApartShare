import classes from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/use-input';
import AuthContext from '../store/auth-context';
import { useContext } from 'react';
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
        reset: resetUsernameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(value => value.length > 6);
    // ********************************************* //

    // ********** Using custom http hook ********** //
    const url = 'https://localhost:7209/api/User/login'

    const loginData = data => {
        console.log(data);
        login(data.message);
        navigate('/profile', { replace: true })
    }

    const { isLoading, error, sendRequest } = useHttp({
        url: url,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            login: enteredUsername,
            password: enteredPassword,
        }
    }, loginData);
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
        sendRequest();
    }


    const invalidUsernameClass = usernameInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidPasswordClass = passwordInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';


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
                            type='email'
                            placeholder="Email"
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