import image from "../../images/people/user-1.jpg";
import classes from "./Profile.module.css";
import useInput from "../../hooks/use-input";

const UserProfile = () => {
    const {
        value: enteredFname,
        isValid: enteredFnameIsValid,
        hasError: fNameInputHasError,
        valueChangeHandler: fNameChangeHandler,
        inputBlurHandler: fNameBlurHandler,
        reset: resetFnameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredLname,
        isValid: enteredLnameIsValid,
        hasError: lNameInputHasError,
        valueChangeHandler: lNameChangeHandler,
        inputBlurHandler: lNameBlurHandler,
        reset: resetLnameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInbutHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescriptionInput
    } = useInput(value => value.trim() !== '');

    const formSubmitHandler = event => {
        event.preventDefault();
    }

    return <div className={`container ${classes['text-align-center']}`}>
        <h1 className="heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore</h1>
        <div className={`grid grid--3-cols ${classes['profile-form-container']}`}>
            <div className={`${classes['user-img-container']}`}>
                <img className={classes['user-profile-img']} src={image} alt="User's profile photo" />
            </div>
            <div className={`form-container text-align-left ${classes['pofile-form']}`}>
                <form onSubmit={formSubmitHandler}>
                    <div className={`flex ${classes['form-gap']}`}>
                        <div className="input-div">
                            <input
                                onChange={fNameChangeHandler}
                                onBlur={fNameBlurHandler}
                                type='text'
                                value={enteredFname}
                                placeholder='First name'
                            />
                            {/* <p className={invalidFnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={lNameChangeHandler}
                                onBlur={lNameBlurHandler}
                                type='text'
                                value={enteredLname}
                                placeholder='Last name'
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
                            placeholder='Email address'
                        />
                        {/* <p className={invalidEmailClass}>Please enter valid email</p> */}
                    </div>
                    <div className="input-div">
                        <textarea rows={3}
                            onChange={descriptionChangeHandler}
                            onBlur={descriptionBlurHandler}
                            type='text'
                            value={enteredDescription}
                            placeholder='Something about yourself'
                        />
                        {/* <p className={invalidPasswordClass}>Please enter at least 7 characters</p> */}
                    </div>
                    <button className={`btn btn--full btn--save-changes`}>Save changes</button>
                </form>
            </div>
        </div>
    </div>
};


export default UserProfile;