import React, {useContext} from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-content';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);


    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItetms = cartCtx.items.length > 0;

    const addItemHandler = item => {
        console.log(item)
        return
    };

    const removeItemHandler = id => {
        return
    };

    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map(item => {
            return <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={addItemHandler.bind(null, item)}
                onRemove={removeItemHandler.bind(null, item.id)}
            />
        })}</ul>

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
                {hasItetms && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;
