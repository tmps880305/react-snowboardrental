import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import classes from './AvailableRentals.module.css';
import RentalItem from './RentalItem/RentalItem';
import useHttp from '../../hooks/use-http';


const AvailableRentals = () => {
    const [meals, setMeals] = useState([]);

    const {isLoading, error, sendRequest: fetchMealHandler} = useHttp();

    const fetchData = () => {
        const requestMealsConfig = {url: 'https://react-http-aa7a6-default-rtdb.firebaseio.com/meal.json'};
        const transformMeals = (mealsObj) => {
            const loadMeals = [];
            for (const key in (mealsObj)) {
                loadMeals.push({
                    id: key,
                    name: mealsObj[key].name,
                    description: mealsObj[key].description,
                    price: mealsObj[key].price
                });
            }
            setMeals(loadMeals);
        };
        fetchMealHandler(requestMealsConfig, transformMeals);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const mealsList = meals.map(meal => {
        return <RentalItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    });

    let content = <p>Found no meals.</p>;
    if (error) {
        content = <p>{error}</p>
    }
    if (mealsList.length > 0) {
        content = <ul>{mealsList}</ul>
    }
    if (isLoading) {
        content = <p>Meal is loading...</p>
    }

    return (
        <section className={classes.meals}>
            <Card>
                {content}
            </Card>
        </section>
    )
};

export default AvailableRentals;
