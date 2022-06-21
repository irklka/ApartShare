import { useState } from 'react';
import classes from './Appartment.module.css';
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


const Appartment = (props) => {
    console.log(props.Appartment);

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

    // ********** Using custom http hook ********** //
    const url = 'https://localhost:7209/api/Apartment';

    const registerAppartmentData = data => {
        console.log(data);
    }

    const { sendRequest: addAppartment } = useHttp();
    // ********************************************* //


    const formSubmitHandler = event => {
        event.preventDefault();

        const enteredData = {
            city: enteredCity,
            address: enteredAddress,
            bedsNumber: +enteredNumOfGuests,
            imageBase64: baseImage,
            distanceToCenter: +enteredDistanceToCenter
        }

        console.log(enteredData);

        addAppartment({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: {
                city: enteredData.city,
                address: enteredData.address,
                bedsNumber: enteredData.bedsNumber,
                imageBase64: baseImage,
                distanceToCenter: enteredDistanceToCenter
            }
        }, registerAppartmentData);
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
                    <form>
                        <div className="input-div">
                            <input
                                onChange={cityChangeHandler}
                                onBlur={cityBlurHandler}
                                type='text'
                                value={enteredCity}
                                placeholder={`${props.Appartment && "City: " + props.Appartment.city || 'city'}`}
                            />
                            {/* <p className={invalidFnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={addressChangeHandler}
                                onBlur={addressBlurHandler}
                                type='text'
                                value={enteredAddress}
                                placeholder={`${props.Appartment && "Address: " + props.Appartment.address || 'address'}`}
                            />
                            {/* <p className={invalidLnameClass}>Please do not leave input blank</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={distanceToCenterChangeHandler}
                                onBlur={distanceToCenterBlurHandler}
                                type='email'
                                value={enteredDistanceToCenter}
                                placeholder={`${props.Appartment && "Distance to center: " + props.Appartment.distanceToCenter || 'Distance to center'}`}
                            />
                            {/* <p className={invalidEmailClass}>Please enter valid email</p> */}
                        </div>
                        <div className="input-div">
                            <input
                                onChange={numOfGuestsChangeHandler}
                                onBlur={numOfGuestsBlurHandler}
                                type='text'
                                value={enteredNumOfGuests}
                                placeholder={`${props.Appartment && "Max number of guests: " + props.Appartment.bedsNumber || 'Max number of guests'}`}
                            />
                            {/* <p className={invalidPasswordClass}>Please enter at least 7 characters</p> */}
                        </div>
                        <div className="input-div">
                            <textarea rows={3}
                                onChange={descriptionChangeHandler}
                                onBlur={descriptionBlurHandler}
                                type='text'
                                value={enteredDescription}
                                placeholder={`${props.Appartment && props.Appartment.description || 'Description'}`}
                            />
                            {/* <p className={invalidPasswordClass}>Please enter at least 7 characters</p> */}
                        </div>
                        <div className="input-div">
                            <input type="file" onChange={uploadImage} onBlur={imageBlurHandler} />
                            {/* <p className={invalidFileClass}>Please upload valid image</p> */}
                        </div>
                    </form>
                </div>
                <div className={`${classes['user-img-container']}`}>
                    <img className={classes['user-profile-img']} src={props.Appartment && props.Appartment.imageBase64 || apartmentAvatar} alt='House' />
                </div>
            </div>
        </div>
        <button onClick={formSubmitHandler} className={`btn btn--full btn--save-all-changes`}>Save all changes</button>

    </div>
}

export default Appartment;