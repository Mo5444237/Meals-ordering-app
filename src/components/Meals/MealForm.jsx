import { useRef, useState } from "react";

import Input from "../UI/Input";
import classes from "./MealForm.module.css";

function MealForm(props) {
    const amountInputRef = useRef();
    const [amountIsvalid, setAmountIsvalid] = useState(true);
    
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        if (
            enteredAmount.trim().length === 0 ||
            +enteredAmount < 1 ||
            +enteredAmount > 5
        ) {
            setAmountIsvalid(false);
            return;
        }
        props.onAddToCart(+enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button type="submit">+ Add</button>
            {!amountIsvalid && <p>Please enter a valid amount</p>}
        </form>
    );
}

export default MealForm;
