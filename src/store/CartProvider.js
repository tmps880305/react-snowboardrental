import React from 'react';

import CartContext from './cart-content';


const addItemHandanler = (item) => {
};

const removeItemHandler = (id) => {
};

const CartProvider = (props) => {
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemHandanler,
        removeItem: removeItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;
