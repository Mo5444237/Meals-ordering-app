/* eslint-disable no-unused-vars */
import React from 'react';

const cartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {},
})

export default cartContext;