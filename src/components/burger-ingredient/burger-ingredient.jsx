import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { selectBurgerIngredientWithCountById } from '../../services/selectors/ingredients';
import burgerIngredientStyles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { INGREDIENT_ROUTE } from '../../utils/const-variables/route-variables';

export const BurgerIngredient = ({ ingredientId }) => {
  const location = useLocation();

  const ingredient = useSelector(state =>
    selectBurgerIngredientWithCountById(state, ingredientId)
  );

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <Link
      style={{ opacity }}
      className={burgerIngredientStyles.burger_ingredient}
      ref={dragRef}
      to={INGREDIENT_ROUTE.replace(':id', ingredientId)}
      state={{ background: location }}
    >
      {ingredient.count > 0 && (
        <Counter count={ingredient.count} size="default" />
      )}
      <img
        className={burgerIngredientStyles.burger_image}
        alt="Burger Item"
        src={ingredient.image_mobile}
        srcSet={`${ingredient.image} 1000w`}
      />
      <p
        className={`${burgerIngredientStyles.burger_price} text text_type_digits-default p-1`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <p
        className={`${burgerIngredientStyles.burger_name} text text_type_main-default`}
      >
        {ingredient.name}
      </p>
    </Link>
  );
};

BurgerIngredient.propTypes = {
  ingredientId: PropTypes.string.isRequired,
};
