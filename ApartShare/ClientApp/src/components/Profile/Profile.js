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

    return <div className={`container ${classes['text-align-center']}`}>
        <h1 className="heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore</h1>
        <div className={`grid grid--3-cols ${classes['profile-form-container']}`}>
            <div className={`${classes['user-img-container']}`}>
                <img className={classes['user-profile-img']} src={props.image} alt="User's profile photo" />
            </div>
            <div className={`form-container text-align-left ${classes['pofile-form']}`}>
                <form>
                    <div className={`flex ${classes['form-gap']}`}>
                        <div className="input-div">
                            <input
                                onChange={fullNameChangeHandler}
                                onBlur={fullNameBlurHandler}
                                type='text'
                                value={enteredFullname}
                                placeholder={`${"Full name: " + props.fullName}`}
                            />
                            {/* <p className={invalidFnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={userNameChangeHandler}
                                onBlur={userNameBlurHandler}
                                type='text'
                                value={enteredUsername}
                                placeholder={`${"Username: " + props.username}`}
                            />
                            {/* <p className={invalidLnameClass}>Please do not leave input blank</p> */}
                        </div>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            type='email'
                            value={enteredEmail}
                            placeholder={`${"Email: " + props.email}`}
                        />
                        {/* <p className={invalidEmailClass}>Please enter valid email</p> */}
                    </div>
                </form>
            </div>
        </div>
    </div>
};


export default UserProfile;