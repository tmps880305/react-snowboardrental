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
        value: enteredStreet,
        isValid: streetIsValid,
        hasError: streetHasError,
        inputChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        resetInput: resetStreet
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

    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    const confirmHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }


        // console.log(`Name: ${enteredName} , Address: ${enteredStreet}, ${enteredCity}, ${enteredPostal}`);


        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        });

        resetName();
        resetStreet();
        resetPostal();
        resetCity();

    };

    const nameInputClasses = `${classes.control} ${nameHasError ? `${classes.invalid}` : ''}`;
    const streetInputClasses = `${classes.control} ${streetHasError ? `${classes.invalid}` : ''}`;
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
            {nameHasError && <label className={classes.invalid}>Name must not be empty.</label>}
        </div>
        <div className={streetInputClasses}>
            <label htmlFor='street'>Street</label>
            <input
                type='text'
                id='street'
                value={enteredStreet}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
            />
            {streetHasError && <label className={classes.invalid}>Street must not be empty.</label>}
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
            {cityHasError && <label className={classes.invalid}>City must not be empty.</label>}
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes["button--alt"]} onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
        </div>
    </form>

};

export default Checkout;
