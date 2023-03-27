import React, {useState} from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Footer from "./components/UI/Footer";

function App() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const shownCartHandler = event => {
        setCartIsShown(true);
    };
    const hideCartHandler = event => {
        setCartIsShown(false);
    };

    return (
        <CartProvider>
            {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
            <Header onShowCart={shownCartHandler}/>
            <main>
                <Meals/>
            </main>
            <Footer/>
        </CartProvider>
    );
}

export default App;
