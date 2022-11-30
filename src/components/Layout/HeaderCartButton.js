import React, {useContext, useState, useEffect} from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-content';

const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((accumulator, item) => {
        return accumulator + item.amount;
    }, 0);

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [items]);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )

};

export default HeaderCartButton;
