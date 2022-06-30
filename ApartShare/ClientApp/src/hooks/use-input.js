import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isBlured, setIsBlured] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isBlured;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value)
    }

    const inputFocuseHandler = (event) => {
        setIsFocused(true);
    }

    const inputBlurHandler = (event) => {
        setIsFocused(false);
        setIsBlured(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsBlured(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        isFocused,
        valueChangeHandler,
        inputBlurHandler,
        inputFocuseHandler,
        reset,
    }
}

export default useInput;    