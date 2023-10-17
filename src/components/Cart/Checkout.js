import React from 'react';

import classes from './Checkout.module.css';
import useInputvalid from '../../hooks/use-inputvalid';

const Checkout = (props) => {

    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetInput: resetName
    } = useInputvalid((value) => value.trim() !== '');

    const {
        value: enteredHeight,
        isValid: heightIsValid,
        hasError: heightHasError,
        inputChangeHandler: heightChangeHandler,
        inputBlurHandler: heightBlurHandler,
        resetInput: resetHeight
    } = useInputvalid((value) => value.trim() !== '');

    const {
        value: enteredPostal,
        isValid: postalIsValid,
        hasError: postalHasError,
        inputChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurHandler,
        resetInput: resetPostal
    } = useInputvalid((value) => value.length === 5);

    const {
        value: enteredCity,
        isValid: cityIsValid,
        hasError: cityHasError,
        inputChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        resetInput: resetCity
    } = useInputvalid((value) => value.trim() !== '');

    const formIsValid = nameIsValid && heightIsValid && postalIsValid && cityIsValid;

    const confirmHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
        // console.log(`Name: ${enteredName} , Address: ${enteredHeight}, ${enteredCity}, ${enteredPostal}`);

        props.onConfirm({
            name: enteredName,
            height: enteredHeight,
            city: enteredCity,
            postal: enteredPostal
        });

        resetName();
        resetHeight();
        resetPostal();
        resetCity();
    };

    const nameInputClasses = `${classes.control} ${nameHasError ? `${classes.invalid}` : ''}`;
    const heightInputClasses = `${classes.control} ${heightHasError ? `${classes.invalid}` : ''}`;
    const postalInputClasses = `${classes.control} ${postalHasError ? `${classes.invalid}` : ''}`;
    const cityInputClasses = `${classes.control} ${cityHasError ? `${classes.invalid}` : ''}`;

    return <form onSubmit={confirmHandler}>
        <div className={nameInputClasses}>
            <label htmlFor='name'>Name</label>
            <input
                type='text'
                id='name'
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
            />
            {nameHasError && <label className={classes.invalid}>Please enter your name.</label>}
        </div>
        <div className={heightInputClasses}>
            <label htmlFor='height'>Height</label>
            <input
                type='text'
                id='height'
                value={enteredHeight}
                onChange={heightChangeHandler}
                onBlur={heightBlurHandler}
            />
            {heightHasError && <label className={classes.invalid}>Please enter your height.</label>}
        </div>
        <div className={postalInputClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input
                type='text'
                id='postal'
                value={enteredPostal}
                onChange={postalChangeHandler}
                onBlur={postalBlurHandler}
            />
            {postalHasError && <label className={classes.invalid}>Postal code should be a 5-digit number.</label>}
        </div>
        <div className={cityInputClasses}>
            <label htmlFor='city'>City</label>
            <input
                type='text'
                id='city'
                value={enteredCity}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
            />
            {cityHasError && <label className={classes.invalid}>Please enter the city you live.</label>}
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes["button--alt"]} onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
        </div>
    </form>

};

export default Checkout;
