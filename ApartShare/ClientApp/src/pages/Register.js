import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Register.module.css';
import useInput from '../hooks/use-input';
import useHttp from '../hooks/use-http';


const Register = () => {
    const navigate = useNavigate();
    const [baseImage, setBaseImage] = useState("");
    const [fileInputIsTouched, setFileInputIsTouched] = useState(false);

    const uploadedImageIsValid = baseImage.includes('image') || baseImage !== "";
    const fileInputHasError = !uploadedImageIsValid && fileInputIsTouched;

    // ********** Using custom input hook ********** //
    const {
        value: enteredFullname,
        isValid: enteredFullnameIsValid,
        hasError: fullNameInputHasError,
        valueChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(value => value.includes('@'));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(value => value.length > 7);
    // ********************************************* //

    // ********** File input type logic ********** //
    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setBaseImage(base64);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = error => {
                reject(error);
            }
        });
    }

    const imageBlurHandler = event => {
        setFileInputIsTouched(true);
    }
    // ********************************************* //

    // ********** Using custom http hook for registering user ********** //
    const url = 'https://localhost:7209/api/User/registration';

    const registerData = data => {
        navigate('/login', { replace: true });
    }

    const { sendRequest } = useHttp();
    // ********************************************* //

    // ********** Form validation logic ********** //
    let formIsValid = false;

    if (enteredFullnameIsValid &&
        enteredPasswordIsValid &&
        enteredEmailIsValid &&
        enteredUsernameIsValid) {
        formIsValid = true;
    }
    // ********************************************* //

    // ********** Form submission logic ********** //
    const formSubmitHandler = (event) => {
        event.preventDefault();

        // Setting isTouched states to true
        fullNameBlurHandler();
        userNameBlurHandler();
        emailBlurHandler();
        passwordBlurHandler();

        if (!formIsValid) {
            return;
        }

        // Sending sign up request
        sendRequest({
            url: url,
            method: 'POST',
            body: {
                email: enteredEmail,
                password: enteredPassword,
                loginName: enteredUsername,
                fullName: enteredFullname,
                imageBase64: baseImage,
            }
        }, registerData);
    }
    // ********************************************* //

    // ********** Alerting invalid input errors ********** //
    const invalidFullnameClass = fullNameInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidUsernameClass = userNameInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidEmailClass = emailInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidPasswordClass = passwordInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidFileClass = fileInputHasError ?
        'invalid-inputs visible' : 'invalid-inputs';
    // ********************************************* //

    return <div className={`wrapper ${classes['login-background']}`}>
        <div className="form-container form-container-settings text-align-left">
            <h1>Sign up</h1>
            <form onSubmit={formSubmitHandler}>
                <div className={`flex ${classes['form-gap']}`}>
                    <div className="input-div">
                        <input
                            onChange={fullNameChangeHandler}
                            onBlur={fullNameBlurHandler}
                            type='text'
                            value={enteredFullname}
                            placeholder='Full name'
                        />
                        <p className={invalidFullnameClass}>Please do not leave input blank</p>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={userNameChangeHandler}
                            onBlur={userNameBlurHandler}
                            type='text'
                            value={enteredUsername}
                            placeholder='Username'
                        />
                        <p className={invalidUsernameClass}>Please do not leave input blank</p>
                    </div>
                </div>
                <div className="input-div">
                    <input
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        type='email'
                        value={enteredEmail}
                        placeholder='Email address'
                    />
                    <p className={invalidEmailClass}>Please enter valid email</p>
                </div>
                <div className="input-div">
                    <input
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        type='password'
                        value={enteredPassword}
                        placeholder='Create password'
                    />
                    <p className={invalidPasswordClass}>Please enter at least 8 characters</p>
                </div>
                <div className="input-div">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        onBlur={imageBlurHandler}
                    />
                    <p className={invalidFileClass}>Please upload valid image or register without it</p>
                </div>
                <button className={`btn btn--full ${classes['btn--register']}`}>Register</button>
            </form>
        </div>

    </div>
}

export default Register;