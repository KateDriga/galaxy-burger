import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { selectBurgerIngredientById } from '../../services/selectors/ingredients';
import {
  setIngredientId,
  clearIngredientId,
} from '../../services/slices/modal';
import burgerIngredientStyles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

export const BurgerIngredient = ({ ingredientId }) => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const ingredient = useSelector(state =>
    selectBurgerIngredientById(state, ingredientId)
  );

  const handleOpenModal = () => {
    setModalIsVisible(true);
    dispatch(setIngredientId({ id: ingredient._id }));
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(clearIngredientId());
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id, type: ingredient.type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <>
      <div
        style={{ opacity }}
        className={burgerIngredientStyles.burger_ingredient}
        onClick={handleOpenModal}
        ref={dragRef}
      >
        {ingredient?.count > 0 && (
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
  ingredientId: PropTypes.string.isRequired,
};
