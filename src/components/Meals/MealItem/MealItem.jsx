import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
    return;
  };
  return (
    <li className={classes.items}>
      <div className={classes.meal}>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{`$${props.meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
