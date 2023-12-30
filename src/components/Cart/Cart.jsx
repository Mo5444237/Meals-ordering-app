import { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from './Checkout';
import Modal from "../UI/Modal";
import cartContext from '../../store/cart-context';


const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(cartContext);
    const totalAmount = `$${Math.max(cartCtx.totalAmount.toFixed(2))}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(import.meta.env.VITE_ORDERS_API, {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHideCart}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            <ul className={classes["cart-items"]}>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        summary={item.summary}
                        price={item.price}
                        amount={item.amount}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
                ))}
            </ul>
            <div className={classes.total}>
                <p>Total amount</p>
                <p>{totalAmount}</p>
            </div>
            {isCheckout && (
                <Checkout
                    onCancel={props.onHideCart}
                    onConfirm={submitOrderHandler}
                />
            )}
            {!isCheckout && cartActions}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    
    const didSubmitModalContent = (
        <Fragment>
            <p>ordered successfully</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;