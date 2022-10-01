import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientStyles from './burger-ingredient.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const BurgerIngredient = ({ imgSrc, imgSrcMobile, price, ingName }) => {
  const [ingCount, setIngCount] = useState(0);
  const incrementIngredient = () => setIngCount(prevState => ++prevState);

  return (
    <div
      className={burgerIngredientStyles.burger_ingredient}
      onClick={incrementIngredient}
    >
      {ingCount > 0 && <Counter count={ingCount} size="default" />}
      <img
        className={burgerIngredientStyles.burger_image}
        alt="Burger Item"
        src={imgSrcMobile}
        srcSet={`${imgSrc} 1000w`}
      />
      <p
        className={`${burgerIngredientStyles.burger_price} text text_type_digits-default p-1`}
      >
        {price} <CurrencyIcon type="primary" />
      </p>
      <p
        className={`${burgerIngredientStyles.burger_name} text text_type_main-default`}
      >
        {ingName}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgSrcMobile: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingName: PropTypes.string.isRequired,
};
