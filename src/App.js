import React, {useState} from 'react';

import Header from './components/Layout/Header';
import Rentals from './components/Rentals/Rentals'
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Footer from "./components/Layout/Footer";

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
                <Rentals/>
            </main>
            <Footer/>
        </CartProvider>
    );
}

export default App;
