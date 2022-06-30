import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Apartment.module.css';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import apartmentAvatar from './../../images/house.png'

const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>

const arrowUp = <svg xmlns="http://www.w3.org/2000/svg" className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
</svg>

const Apartment = (props) => {
    const navigate = useNavigate();

    const [toggleAccordion, setToggleAccordion] = useState(false);
    const [baseImage, setBaseImage] = useState("");
    const [fileInputIsTouched, setFileInputIsTouched] = useState(false);

    const uploadedImageIsValid = baseImage.includes('image');
    const fileInputHasError = !uploadedImageIsValid && fileInputIsTouched;

    const displayContentClass = toggleAccordion ? 'display' : '';
    const itemBorderClass = toggleAccordion ? 'item-border' : '';

    // ********** Using custom input hook ********** //
    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        isFocused: cityInputIsFocused,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        inputFocuseHandler: cityFocusHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredAddress,
        isValid: enteredAddressIsValid,
        isFocused: addressInputIsFocused,
        hasError: addressInputHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        inputFocuseHandler: addressFocusHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDistanceToCenter,
        isValid: enteredDistanceToCenterIsValid,
        isFocused: distanceInputIsFocused,
        hasError: distanceInputHasError,
        valueChangeHandler: distanceToCenterChangeHandler,
        inputBlurHandler: distanceToCenterBlurHandler,
        inputFocuseHandler: distanceFocusHandler,
    } = useInput(value => Number.isFinite(+value) && value > 0);

    const {
        value: enteredNumOfGuests,
        isValid: enteredNumOfGuestsIsValid,
        isFocused: bedsInputIsFocused,
        hasError: bedsInputHasError,
        valueChangeHandler: numOfGuestsChangeHandler,
        inputBlurHandler: numOfGuestsBlurHandler,
        inputFocuseHandler: bedsFocusHandler,
    } = useInput(value => Number.isInteger(+value) && +value > 0);
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

    // ********** Using custom http hook for adding or changing user's apartment info ********** //
    const url = 'https://localhost:7209/api/Apartment';

    const registerApartmentData = data => {
        navigate(0);
    }

    const { sendRequest: addApartment } = useHttp();
    // ********************************************* //

    let formIsValid = false;

    if (props.Apartment !== null || (enteredCityIsValid &&
        enteredAddressIsValid &&
        enteredDistanceToCenterIsValid &&
        enteredNumOfGuestsIsValid &&
        uploadedImageIsValid)) {
        formIsValid = true;
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        // Setting isTouched states to true
        cityBlurHandler();
        addressBlurHandler();
        distanceToCenterBlurHandler();
        numOfGuestsBlurHandler();
        imageBlurHandler();

        if (!formIsValid) {
            return;
        }

        const enteredData = {
            city: enteredCity !== '' ? enteredCity : props.Apartment.city,
            address: enteredAddress !== '' ? enteredAddress : props.Apartment.address,
            bedsNumber: +enteredNumOfGuests !== 0 ? +enteredNumOfGuests : props.Apartment.bedsNumber,
            distanceToCenter: +enteredDistanceToCenter !== 0 ? +enteredDistanceToCenter : props.Apartment.distanceToCenter,
            imageBase64: baseImage !== '' ? baseImage : props.Apartment.imageBase64,
        }

        addApartment({
            url: url,
            method: 'POST',
            credentials: 'include',
            body: {
                city: enteredData.city,
                address: enteredData.address,
                bedsNumber: enteredData.bedsNumber,
                imageBase64: enteredData.imageBase64,
                distanceToCenter: enteredData.distanceToCenter
            }
        }, registerApartmentData);
    }

    const addApartmentClickHandler = event => {
        setToggleAccordion(prev => !prev);
    }

    // ********** Alerting invalid input errors ********** //
    const hasAddedApartment = props.Apartment !== null ? true : false;

    const invalidCityClass = cityInputHasError && !hasAddedApartment ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidAddressClass = addressInputHasError && !hasAddedApartment ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidDistanceClass = distanceInputHasError && !hasAddedApartment ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidBedsClass = bedsInputHasError && !hasAddedApartment ?
        'invalid-inputs visible' : 'invalid-inputs';
    const invalidFileClass = fileInputHasError && !hasAddedApartment ?
        'invalid-inputs visible' : 'invalid-inputs';
    // ********************************************* //

    return <div className='container'>
        <div className={`accordion ${classes['apartment-form-container']}`}>
            <div onClick={addApartmentClickHandler} className={`item ${itemBorderClass}`}>
                <p>Add an apartment</p>
                {toggleAccordion ? arrowUp : arrowDown}
            </div>
            <div className={`grid--2-cols ${classes['div--content']} ${displayContentClass}`}>
                <div className={`form-container text-align-left 
            ${classes['pofile-form']}
            ${classes['profile-form--apartment']}`}>
                    <form>
                        <div className="input-div">
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                onChange={cityChangeHandler}
                                onBlur={cityBlurHandler}
                                onFocus={cityFocusHandler}
                                type='text'
                                value={!hasAddedApartment || cityInputIsFocused || enteredCity.length > 0
                                    ? enteredCity : props.Apartment.city}
                                placeholder={!hasAddedApartment ? "City" : ""}
                            />
                            <p className={invalidCityClass}>Please do not leave input blank</p>
                        </div>
                        <div className="input-div">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                onChange={addressChangeHandler}
                                onBlur={addressBlurHandler}
                                onFocus={addressFocusHandler}
                                type='text'
                                value={!hasAddedApartment || addressInputIsFocused || enteredAddress.length > 0
                                    ? enteredAddress : props.Apartment.address}
                                placeholder={!hasAddedApartment ? "Address" : ""}
                            />
                            <p className={invalidAddressClass}>Please do not leave input blank</p>

                        </div>
                        <div className="input-div">
                            <label htmlFor="distance">Distance to center in meters</label>
                            <input
                                id="distance"
                                onChange={distanceToCenterChangeHandler}
                                onBlur={distanceToCenterBlurHandler}
                                onFocus={distanceFocusHandler}
                                type='number'
                                min={1}
                                value={!hasAddedApartment || distanceInputIsFocused || enteredDistanceToCenter > 0
                                    ? enteredDistanceToCenter : props.Apartment.distanceToCenter}
                                placeholder={!hasAddedApartment ? "Distance to center" : ""}
                            />
                            <p className={invalidDistanceClass}>Distance should be at least 1</p>
                        </div>
                        <div className="input-div">
                            <label htmlFor="beds">Number of guests</label>
                            <input
                                id="beds"
                                onChange={numOfGuestsChangeHandler}
                                onBlur={numOfGuestsBlurHandler}
                                onFocus={bedsFocusHandler}
                                type='number'
                                min={1}
                                value={!hasAddedApartment || bedsInputIsFocused || enteredNumOfGuests > 0
                                    ? enteredNumOfGuests : props.Apartment.bedsNumber}
                                placeholder={!hasAddedApartment ? "Max number of guests" : ""}
                            />
                            <p className={invalidBedsClass}>Number of guests should be at least 1 and should be an integer</p>
                        </div>
                        <div className="input-div">
                            <label htmlFor="apartment-img">Apartment photo</label>
                            <input
                                id="apartment-img"
                                type="file" onChange={uploadImage} onBlur={imageBlurHandler} />
                            <p className={invalidFileClass}>Please upload valid image</p>
                        </div>
                        <button onClick={formSubmitHandler} className={`btn btn--full btn--save-all-changes`}>Save all changes</button>
                    </form>
                </div>
                <div className={`${classes['user-img-container']}`}>
                    <img
                        className={classes['user-profile-img']}
                        src={props.Apartment && props.Apartment.imageBase64 || apartmentAvatar}
                        alt='House'
                        accept="image/*"
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Apartment;