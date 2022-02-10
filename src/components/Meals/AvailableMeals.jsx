import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, error, getMeals] = useHttp();
  const applyData = (data) => {
    const loadedMeals = [];
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
  };
  useEffect(() => {
    getMeals(
      {
        url: "https://react-practice-793ad-default-rtdb.firebaseio.com/meals.json",
      },
      applyData
    );
  }, [getMeals]);
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
