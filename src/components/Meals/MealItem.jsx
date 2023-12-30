import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealForm from './MealForm';

import cartContext from "../../store/cart-context";

function MealItem(props) {
    const cartCtx = useContext(cartContext);
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p>
                <p className={classes.price}>{props.price}</p>
            </div>
            <MealForm id={props.id} onAddToCart={addToCartHandler}/>
        </li>
    );
}

export default MealItem;