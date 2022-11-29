import React, {useReducer} from 'react';

import CartContext from './cart-content';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedItems = state.items.concat(action.item);
        //concat will add the new value to the array but return a NEW array
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        
        return {
            items: updatedItems,
            amount: updatedAmount
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandanler = (item) => {
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item})
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', id: id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandanler,
        removeItem: removeItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;
