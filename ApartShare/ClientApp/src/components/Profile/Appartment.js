import { useState } from 'react';
import image from '../../images/houses/house-1.jpg';
import classes from './Appartment.module.css';
import useInput from '../../hooks/use-input';

const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>

const arrowUp = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
</svg>


const Appartment = () => {
    const [toggleAccordion, setToggleAccordion] = useState(false);

    const displayContentClass = toggleAccordion ? 'display' : '';
    const itemBorderClass = toggleAccordion ? 'item-border' : '';

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: resetCityInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredAddress,
        isValid: enteredAddressIsValid,
        hasError: addressInputHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: resetAddressInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDistanceToCenter,
        isValid: enteredDistanceToCenterIsValid,
        hasError: distanceToCenterInputHasError,
        valueChangeHandler: distanceToCenterChangeHandler,
        inputBlurHandler: distanceToCenterBlurHandler,
        reset: resetDistanceToCenterInput
    } = useInput(value => Number.isFinite(value));

    const {
        value: enteredNumOfGuests,
        isValid: enteredNumOfGuestsIsValid,
        hasError: numOfGuestsInputHasError,
        valueChangeHandler: numOfGuestsChangeHandler,
        inputBlurHandler: numOfGuestsBlurHandler,
        reset: resetNumOfGuestsInput
    } = useInput(value => Number.isInteger(value));

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

    const addAppartmentClickHandler = event => {
        setToggleAccordion(prev => !prev);
    }


    return <div className='container'>
        <div className={`accordion ${classes['appartment-form-container']}`}>
            <div onClick={addAppartmentClickHandler} className={`item ${itemBorderClass}`}>
                <p>Add an appartment</p>
                {toggleAccordion ? arrowUp : arrowDown}
            </div>
            <div className={`grid--2-cols ${classes['div--content']} ${displayContentClass}`}>
                <div className={`form-container text-align-left 
            ${classes['pofile-form']}
            ${classes['profile-form--appartment']}`}>
                    <form onSubmit={formSubmitHandler}>
                        <div className="input-div">
                            <input
                                onChange={cityChangeHandler}
                                onBlur={cityBlurHandler}
                                type='text'
                                value={enteredCity}
                                placeholder='City'
                            />
                            {/* <p className={invalidFnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={addressChangeHandler}
                                onBlur={addressBlurHandler}
                                type='text'
                                value={enteredAddress}
                                placeholder='Address'
                            />
                            {/* <p className={invalidLnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={distanceToCenterChangeHandler}
                                onBlur={distanceToCenterBlurHandler}
                                type='email'
                                value={enteredDistanceToCenter}
                                placeholder='Distance to center'
                            />
                            {/* <p className={invalidEmailClass}>Please enter valid email</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={numOfGuestsChangeHandler}
                                onBlur={numOfGuestsBlurHandler}
                                type='text'
                                value={enteredNumOfGuests}
                                placeholder='Max number of guests'
                            />
                            {/* <p className={invalidPasswordClass}>Please enter at least 7 characters</p> */}
                        </div>
                        <div className="input-div">
                            <textarea rows={3}
                                onChange={descriptionChangeHandler}
                                onBlur={descriptionBlurHandler}
                                type='text'
                                value={enteredDescription}
                                placeholder='Description'
                            />
                            {/* <p className={invalidPasswordClass}>Please enter at least 7 characters</p> */}
                        </div>
                    </form>
                </div>
                <div className={`${classes['user-img-container']}`}>
                    <img className={classes['user-profile-img']} src={image} alt='House' />
                </div>
            </div>
        </div>
        <button className={`btn btn--full btn--save-all-changes`}>Save all changes</button>

    </div>
}

export default Appartment;