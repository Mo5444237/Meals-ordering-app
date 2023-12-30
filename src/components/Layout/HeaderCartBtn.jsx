import { useContext, useEffect, useState } from "react";

import CartIcon from './CartIcon';
import classes from './HeaderCartBtn.module.css';
import cartContext from "../../store/cart-context";

function HeaderCartBtn(props) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(cartContext);
    
    const numberOfCartItems = cartCtx.items.reduce(
        (currentNumber, item) => {
            return currentNumber + item.amount;
        },
        0
    );

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items])
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
                <span className={classes.badge}>{numberOfCartItems}</span>
            </span>
        </button>
    );
}

export default HeaderCartBtn;