import React from 'react';

const CartContent = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {
    },
    removeItem: (id) => {
    },
    clearItem: () => {
    }
});

export default CartContent;
