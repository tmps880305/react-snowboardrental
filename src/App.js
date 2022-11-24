import React, {Fragment, useState} from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';

function App() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const shownCartHandler = event => {
        setCartIsShown(true);
    };

    const hideCartHandler = event => {
        setCartIsShown(false);
    };


    return (
        <Fragment>
            {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
            <Header onShowCart={shownCartHandler}/>
            <main>
                <Meals/>
            </main>
        </Fragment>
    );
}

export default App;
