import React, {useContext, useState} from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-content';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckingout, setIsCheckingout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const {isLoading, error, sendRequest: sendOrderHandler} = useHttp();


    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItetms = cartCtx.items.length > 0;

    const addItemHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const removeItemHandler = id => {
        cartCtx.removeItem(id);
    };

    const orderClickHandler = () => {
        setIsCheckingout(true);
    };

    const submitOrderHandler = (userData) => {
        // const sendOrderConfig = {
        //     url: 'https://react-http-aa7a6-default-rtdb.firebaseio.com/orders.json',
        //     method: 'POST',
        //     body: {
        //         user: userData,
        //         orderItems: cartCtx.items
        //     },
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };
        const sendOrderConfig = {
            url: 'http://localhost:8080/api/v1/rentalorder/neworder',
            method: 'POST',
            body: {
                customerName: userData.name,
                height: parseInt(userData.height),
                postal: userData.postal,
                city: userData.city,
                items: cartCtx.items,
                total: cartCtx.totalAmount
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // console.log(cartCtx);
        sendOrderHandler(sendOrderConfig, () => {
        });

        setDidSubmit(true);
        cartCtx.clearItem();

    };


    const orderSuccessHandler = () => {
        props.onHideCart();
        // cartCtx.clearItem();
        setDidSubmit(false);
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
        })}</ul>;

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
        {hasItetms && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
    </div>;


    const cartModalConent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckingout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
        {!isCheckingout && modalActions}
    </React.Fragment>;

    const isLoadingContent = <p>Sending order data ...</p>;

    const didSubmitContent = <React.Fragment>
        <p>Booking Successfully!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={orderSuccessHandler}>OK</button>
        </div>
    </React.Fragment>;

    const errorContent = <p>{error}</p>


    return (
        <Modal onHideCart={props.onHideCart}>
            {!isLoading && !didSubmit && cartModalConent}
            {isLoading && !didSubmit && isLoadingContent}
            {!isLoading && didSubmit && !error && didSubmitContent}
            {error && errorContent}
        </Modal>
    )
};

export default Cart;
