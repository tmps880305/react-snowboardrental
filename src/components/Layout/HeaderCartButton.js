import React, {useContext} from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-content';

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);


    const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
        return accumulator + item.amount;
    }, 0);


    console.log(numberOfCartItems)

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )

};

export default HeaderCartButton;
