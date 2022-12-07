import {useReducer} from 'react';

const initialState = {value: '', isTouched: false};

const inputReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if (action.type === 'USER_BLUR') {
        return {value: state.value, isTouched: true}
    }
    if (action.type === 'USER_RESET') {
        return initialState
    }
    return initialState;
};


const useInputvalid = (validateValue) => {
    const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

    const enterValueIsValid = validateValue(inputState.value);
    const hasError = !enterValueIsValid && inputState.isTouched;

    const inputChangeHandler = event => {
        dispatchInput({type: 'USER_INPUT', value: event.target.value});
    };

    const inputBlurHandler = () => {
        dispatchInput({type: 'USER_BLUR'});
    };

    const resetInput = () => {
        dispatchInput({type: 'USER_RESET'});
    };

    return {
        value: inputState.value,
        isValid: enterValueIsValid,
        hasError: hasError,
        inputChangeHandler,
        inputBlurHandler,
        resetInput
    }

};

export default useInputvalid;
