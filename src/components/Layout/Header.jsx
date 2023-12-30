import { Fragment } from "react";
import HeaderCartBtn from "./HeaderCartBtn";
import coverImage from '../../assets/cover.jpg';
import classes from './Header.module.css';
import MealsSummary from "../Meals/MealsSummary";

function Header(props) {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1>React Meals</h1>
          <HeaderCartBtn onClick={props.onShowCart} />
        </header>
        <div className={classes.cover}>
          <img src={coverImage} alt="cover-image" />
        </div>
        <MealsSummary />
      </Fragment>
    );
}

export default Header;