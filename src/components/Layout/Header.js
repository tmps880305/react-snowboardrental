import React, {Fragment} from 'react';

import mealsImage from '../../assets/img/main_landing.JPG';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>JXC Resort</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table of delicious foods."/>
            </div>
        </Fragment>
    )
};

export default Header;
