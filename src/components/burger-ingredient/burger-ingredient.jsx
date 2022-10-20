import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';
import burgerIngredientStyles from './burger-ingredient.module.css';
import { useContext } from 'react';
import { ConstructorContext, ModalContext } from '../services/app-context';
import { ADD_INGREDIENT } from '../services/actions/constructor-actions';

export const BurgerIngredient = ({ ingredient }) => {
  const { setModalIngredientId } = useContext(ModalContext);
  const { constructorDispatcher } = useContext(ConstructorContext);

  // TODO change with Drag and Drop
  // temporary solution to test constructor context (add ingredient on click)
  const handleOpenModal = () => {
    constructorDispatcher({ type: ADD_INGREDIENT, payload: ingredient });
    setModalIngredientId(ingredient._id);
  };

  // TODO implement increment ingredient functionality
  const ingCount = 0;

  return (
    <div
      className={burgerIngredientStyles.burger_ingredient}
      onClick={handleOpenModal}
    >
      {ingCount > 0 && <Counter count={ingCount} size="default" />}
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
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: INGREDIENT_PROP_TYPES.isRequired,
};
