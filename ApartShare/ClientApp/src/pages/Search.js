
import classes from "./Search.module.css";
import useInput from "../hooks/use-input";
import SearchPageCart from "../components/Cards/SearchPageCart";
import { appartmentData } from '../Data/result-data';

const Search = () => {
    const {
        value: enteredLocation,
        isValid: enteredLocationIsValid,
        hasError: locationInputHasError,
        valueChangeHandler: locationChangeHandler,
        inputBlurHandler: locationBlurHandler,
        reset: resetLocationInput
    } = useInput(value => value.trim() != '');

    const {
        value: enteredCheckStatus,
        isValid: enteredCheckStatusIsValid,
        hasError: checkStatusInputHasError,
        valueChangeHandler: checkStatusChangeHandler,
        inputBlurHandler: checkStatusBlurHandler,
        reset: resetCheckStatusInput
    } = useInput(value => value.trim() != '');

    const formSubmitHandler = () => {

    }

    return <div className="page">
        <div className="container">
            <h1 className="page-heading">Find Appartments</h1>

            <form onSubmit={formSubmitHandler} className={classes['search-form']}>
                <input onChange={locationChangeHandler} value={enteredLocation} type="text" placeholder="Search location" />
                <input onChange={checkStatusChangeHandler} value={enteredCheckStatus} type="date" placeholder="Check in - Check out" />
                <button className="btn btn--full">Search</button>
            </form>

            <div className={`grid grid--2-cols ${classes['search-container']}`}>
                {appartmentData.map(data => {
                    return <SearchPageCart
                        img={data.img}
                        address={data.address}
                        distance={data.distance}
                        beds={data.beds}
                        description={data.description}
                    />
                })}
            </div>
        </div>
    </div>
}

export default Search;