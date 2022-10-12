import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useCallback, useState } from 'react';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/appConstVariables';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBurgerIngredients,
  selectConstructorBunIngredient,
  selectConstructorMiddleIngredients,
  selectTotalPrice,
} from '../../services/selectors/ingredients';
import { placeNewOrder } from '../../services/effects/orders';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const bunIngredient =
    useSelector(selectConstructorBunIngredient) || BUN_INGREDIENT_PLACEHOLDER;
  const midIngredients = useSelector(selectConstructorMiddleIngredients);
  // const midIngredients = useSelector(selectBurgerIngredients);

  const totalPrice = useSelector(selectTotalPrice) || 100;

  // TODO replace test data with info from server
  const generateRandomOrderNumber = useCallback(() => {
    return Math.trunc(Math.random() * 100_000) + 1;
  }, []);

  const placeOrder = () => {
    dispatch(placeNewOrder());
    // if (totalPrice > 0) {
    //   // setModalIsVisible(true);
    // }
  };
  const handleCloseModal = () => setModalIsVisible(false);

  return (
    <div className={cn(burgerConstructorStyles.constructor, 'custom-scroll')}>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunIngredient.name}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image_mobile}
        />
      </div>
      <div
        className={cn(
          burgerConstructorStyles.ingredients_middle,
          'custom-scroll',
          'p-2'
        )}
      >
        {midIngredients.map(i => (
          <div
            key={i._id}
            className={burgerConstructorStyles.constructor_element_row}
          >
            <DragIcon type="primary" />
            <div className={cn(burgerConstructorStyles.constructor_element)}>
              <ConstructorElement
                text={i.name}
                price={i.price}
                thumbnail={i.image_mobile}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunIngredient.name}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image_mobile}
        />
      </div>
      <div
        className={cn(
          burgerConstructorStyles.order_details,
          'pt-10 pr-7 pb-15'
        )}
      >
        <div className={burgerConstructorStyles.order_details_price}>
          <span className="text text_type_digits-medium">
            {totalPrice || 0}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        {totalPrice > 0 && (
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={placeOrder}
          >
            Оформить заказ
          </Button>
        )}
      </div>
      {modalIsVisible && (
        <Modal onClose={handleCloseModal} title="">
          <OrderDetails orderNumber={generateRandomOrderNumber()} />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  bunIngredient: INGREDIENT_PROP_TYPES.isRequired,
  midIngredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPES).isRequired,
};

BurgerConstructor.defaultProps = {
  bunIngredient: BUN_INGREDIENT_PLACEHOLDER,
  midIngredients: [],
};
