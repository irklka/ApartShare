import { useState } from "react";
import classes from "./Search.module.css";
import useInput from "../hooks/use-input";
import SearchPageCard from "../components/Cards/SearchPageCard";
import useHttp from '../hooks/use-http';


const Search = (props) => {
    const [searchResult, setSearchResult] = useState([]);

    // ********** Using custom input hook ********** //
    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: resetCityInput
    } = useInput(value => value.trim() != '');

    const {
        value: enteredFromDate,
        isValid: enteredFromDateIsValid,
        hasError: fromDateInputHasError,
        valueChangeHandler: fromDateChangeHandler,
        inputBlurHandler: fromDateBlurHandler,
        reset: resetFromDateInput
    } = useInput(value => value.trim() != '');

    const {
        value: enteredDueDate,
        isValid: enteredDueDateIsValid,
        hasError: dueDateInputHasError,
        valueChangeHandler: dueDateChangeHandler,
        inputBlurHandler: dueDateBlurHandler,
        reset: resetDueDateInput
    } = useInput(value => value.trim() != '');
    // ********************************************* //

    // ********** Using custom http hook ********** //
    const searchHelper = data => {
        console.log(data);
        if (data?.message) {
            setSearchResult("Result was not found");
        } else {
            setSearchResult(data.apartments);
        }
    }

    const { isLoading: dataIsLoading, sendRequest: searchApartments } = useHttp();
    // ********************************************* //

    const formSubmitHandler = event => {
        event.preventDefault();
        console.log(enteredFromDate);
        console.log(enteredDueDate);
        console.log('entered');
        console.log(url);

        if (enteredFromDate !== "" && enteredDueDate !== "" && enteredDueDate < enteredFromDate) {
            alert("Please enter valid date range");
            return
        }

        const fromDate = enteredFromDate === "" ? null : enteredFromDate;
        const dueDate = enteredDueDate === "" ? null : enteredDueDate;

        const url = `https://localhost:7209/api/Apartment/apartmentsFiltered?city=${enteredCity}&fromDate=${fromDate}&dueDate=${dueDate}`;

        searchApartments({
            url: url,
            credentials: 'include'
        }, searchHelper);
    }

    // console.log(searchResult);

    const loadingElement = <div className={classes.loadingAndSearchMessage}>
        <p>Result is loading, please wait few seconds...</p>
    </div>;

    const resultElement =
        typeof (searchResult) === 'string' ?
            <div className={classes.loadingAndSearchMessage}>
                <p>{searchResult}</p>
            </div>
            :
            <div className={`grid grid--2-cols ${classes['search-container']}`}>
                {searchResult.map(apartment => {
                    return <SearchPageCard
                        key={apartment.ownerId}
                        hostId={apartment.ownerId}
                        img={apartment.imageBase64}
                        city={apartment.city}
                        address={apartment.address}
                        distance={apartment.distanceToCenter}
                        beds={apartment.bedsNumber}
                        fromDate={apartment.fromDate}
                        dueDate={apartment.dueDate}
                        status={apartment.status}
                        guestId={props.userId}
                    />
                })
                }
            </div>




    return <div className="page">
        <div className="container">
            <h1 className="page-heading">Find Appartments</h1>
            <form onSubmit={formSubmitHandler} className={classes['search-form']}>
                <div>
                    <label htmlFor="city">City</label>
                    <input id="city" onChange={cityChangeHandler} value={enteredCity} type="text" placeholder="Search by City" />
                </div>
                <div>
                    <label htmlFor="fromDate">From</label>
                    <input id="fromDate" onChange={fromDateChangeHandler} value={enteredFromDate} type="date" />
                </div>
                <div>
                    <label htmlFor="dueDate">To</label>
                    <input id="dueDate" onChange={dueDateChangeHandler} value={enteredDueDate} type="date" />
                </div>
                <button className="btn btn--full">Search</button>
            </form>

            {dataIsLoading ? loadingElement : resultElement}

        </div>
    </div>
}

export default Search;