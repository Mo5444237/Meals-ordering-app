import { useState, useEffect, useCallback } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

function AvailableMeals() {
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(import.meta.env.VITE_MEALS_API);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      let loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  if (isLoading) {
    return <section className={classes.spinner}></section>;
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
