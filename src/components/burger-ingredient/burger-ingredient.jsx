import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  viewIngredientDetails,
  closeIngredientDetails,
} from '../../services/slices/ingredients';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';
import burgerIngredientStyles from './burger-ingredient.module.css';

export const BurgerIngredient = ({ ingredient }) => {
  // TODO implement increment ingredient functionality
  const ingCount = 0;
  // const [ingCount, setIngCount] = useState(0);
  // const incrementIngredient = () => setIngCount(prevState => ++prevState);

  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const handleOpenModal = () => {
    setModalIsVisible(true);
    dispatch(viewIngredientDetails({ id: ingredient._id }));
  };
  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(closeIngredientDetails());
  };

  return (
    <>
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
      {modalIsVisible && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredient: INGREDIENT_PROP_TYPES.isRequired,
};
