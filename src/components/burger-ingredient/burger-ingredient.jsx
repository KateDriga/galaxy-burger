import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useState } from 'react';
import burgerIngredientStyles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

export const BurgerIngredient = ({
  imgSrc,
  imgSrcMobile,
  price,
  ingName,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  // TODO implement increment ingredient functionality
  const ingCount = 0;
  // const [ingCount, setIngCount] = useState(0);
  // const incrementIngredient = () => setIngCount(prevState => ++prevState);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);

  const modal = (
    <Modal title="Детали ингредиента" onClose={handleCloseModal}>
      <IngredientDetails
        name={ingName}
        imgSrc={imgSrc}
        imgSrcMobile={imgSrcMobile}
        calories={calories}
        proteins={proteins}
        fat={fat}
        carbohydrates={carbohydrates}
      />
    </Modal>
  );

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
      {modalIsVisible && modal}
    </>
  );
};

BurgerIngredient.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgSrcMobile: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingName: PropTypes.string.isRequired,
};
