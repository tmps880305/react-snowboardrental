import React from 'react';
import classes from './RentalsSummary.module.css';

const RentalsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Snowboard Rental at JXC Resort</h2>
            <p>
                Book your snowboard rental online! Your equipments will wait you in the locker for you. Straight to the
                mountain without waiting in line.
            </p>
            <p>
                Try our online resolution for board selection!
            </p>
        </section>
    );
};

export default RentalsSummary;
