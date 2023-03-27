import React, {Fragment} from 'react';

import RentalsSummary from './RentalsSummary';
import AvailableRentals from './AvailableRentals';

const Rentals = (props) => {

    return (
        <Fragment>
            <RentalsSummary/>
            <AvailableRentals/>
        </Fragment>
    )
};

export default Rentals;
