import React, {useReducer} from 'react';

import CartContext from './cart-content';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
            //concat will add the new value to the array but return a NEW array
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    }
    if (action.type === 'REMOVE_CART_ITEM') {
        const findCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const findCartItem = state.items[findCartItemIndex];
        let updatedItems = [...state.items];
        const updatedAmount = state.totalAmount - findCartItem.price;

        if (findCartItem.amount === 1) {
            // last item
            updatedItems = state.items.filter(item => item.id !== action.id);
            // use filter to filter out item with the removing id
        } else {
            updatedItems[findCartItemIndex] = {...findCartItem, amount: findCartItem.amount - 1};
        }


        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            items: [],
            totalAmount: 0
        }
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

    const clearItemHandler = () => {
        dispatchCartAction({type: 'CLEAR_CART'})
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandanler,
        removeItem: removeItemHandler,
        clearItem: clearItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;
