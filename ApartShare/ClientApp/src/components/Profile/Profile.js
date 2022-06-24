import classes from "./Profile.module.css";
import useInput from "../../hooks/use-input";
import { useEffect } from "react";


const UserProfile = (props) => {

    // ********** Using custom input hook ********** //
    const {
        value: enteredFullname,
        isValid: enteredFullnameIsValid,
        hasError: fullNameInputHasError,
        valueChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler,
        reset: resetFullnameInput,
        setInputValue: setFullName
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
        reset: resetUsernameInput,
        setInputValue: setUsername
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
        setInputValue: setEmail
    } = useInput(value => value.includes('@'));
    // ********************************************* //

    return <div className={`container ${classes['text-align-left']}`}>
        <h1 className="page-heading">Profile</h1>
        <div className={`grid grid--2-cols ${classes['profile-form-container']}`}>
            <div className={`${classes['user-img-container']}`}>
                <img className={classes['user-profile-img']} src={props.image} alt="User's profile photo" />
            </div>
            <div className={`text-align-left ${classes['profile-form']}`}>
                <div>
                    <p className={classes.label}>Full Name:</p>
                    <p className={classes.info}>{props.fullName}</p>
                </div>
                <div>
                    <p className={classes.label}>Username:</p>
                    <p className={classes.info}>{props.username}</p>
                </div>
                <div>
                    <p className={classes.label}>Email:</p>
                    <p className={classes.info}>{props.email}</p>
                </div>
            </div>
        </div>
    </div>
};


export default UserProfile;