import { useEffect, useContext } from "react";
import classes from "./Search.module.css";
import useInput from "../hooks/use-input";
import SearchPageCart from "../components/Cards/SearchPageCart";
import { appartmentData } from '../Data/result-data';
import useHttp from '../hooks/use-http';


const Search = () => {

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
    const url = `https://localhost:7209/api/Apartment/apartmentsFiltered?city=${enteredCity}&fromDate=${enteredFromDate}&dueDate=${enteredDueDate}`;

    const searchResult = data => {
        console.log(data);
    }

    const { sendRequest: searchApartments } = useHttp();
    // ********************************************* //

    const formSubmitHandler = event => {
        event.preventDefault();
        console.log(enteredFromDate);
        console.log(enteredDueDate);
        console.log('entered');
        console.log(url);

        if (enteredDueDate < enteredFromDate) {
            alert("Please enter valid date range");
            return
        }

        searchApartments({
            url: url,
            credentials: 'include'
        }, searchResult);
    }

    return <div className="page">
        <div className="container">
            <h1 className="page-heading">Find Appartments</h1>

            <form onSubmit={formSubmitHandler} className={classes['search-form']}>
                <input onChange={cityChangeHandler} value={enteredCity} type="text" placeholder="Search by City" />
                <input onChange={fromDateChangeHandler} value={enteredFromDate} type="date" placeholder="From" />
                <input onChange={dueDateChangeHandler} value={enteredDueDate} type="date" placeholder="to" />
                <button className="btn btn--full">Search</button>
            </form>

            <div className={`grid grid--2-cols ${classes['search-container']}`}>
                {appartmentData.map((data, i) => {
                    return <SearchPageCart
                        key={i}
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