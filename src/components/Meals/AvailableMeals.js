import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const {isLoading, error, sendRequest: fetchMovieHandler} = useHttp();

    const fetchData = () => {
        const requestMoviesConfig = {url: 'https://react-http-aa7a6-default-rtdb.firebaseio.com/meal.json'};
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
        fetchMovieHandler(requestMoviesConfig, transformMeals);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const mealsList = meals.map(meal => {
        return <MealItem
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

export default AvailableMeals;
