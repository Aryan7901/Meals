import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import useHttp from "../hooks/use-http";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, error, sendOrder] = useHttp();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const applyData = (data) => {
    setIsSubmitted(true);
    cartCtx.clearCart();
  };
  const submitOrderHandler = async (userData) => {
    sendOrder(
      {
        url: "https://react-practice-793ad-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: userData,
          orderedItems: cartCtx.items,
        },
      },
      applyData
    );
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const actions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );
  const cardModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && actions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data.........</p>;
  const didSubmitOrder = (
    <React.Fragment>
      {!error && <p>Successfully sent the order data!!</p>}
      {error && <p>{error.message}</p>}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && cardModalContent}
      {isSubmitting && isSubmittingModalContent}
      {isSubmitted && didSubmitOrder}
    </Modal>
  );
};
export default Cart;
