import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { Loader } from '../loader/loader';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectConstructorBunIngredient,
  selectConstructorMiddleIngredientIds,
  selectTotalPrice,
} from '../../services/selectors/ingredients';
import { placeNewOrder } from '../../services/thunks/order';
import { clearOrderNumber } from '../../services/slices/order';
import {
  addBunIngredientToConstructor,
  addMiddleIngredientToConstructor,
} from '../../services/slices/ingredients';
import {
  selectOrderIsFailed,
  selectOrderIsLoading,
} from '../../services/selectors/order';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/appConstVariables';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectOrderIsLoading);
  const failCreatingOrder = useSelector(selectOrderIsFailed);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const bunIngredient =
    useSelector(selectConstructorBunIngredient) || BUN_INGREDIENT_PLACEHOLDER;
  const midIngredientsIds = useSelector(selectConstructorMiddleIngredientIds);
  const totalPrice = useSelector(selectTotalPrice);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ id, type }) {
      type === 'bun'
        ? dispatch(addBunIngredientToConstructor({ id }))
        : dispatch(addMiddleIngredientToConstructor({ id }));
    },
  });

  const placeOrder = () => {
    dispatch(placeNewOrder());
    setModalIsVisible(true);
  };
  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(clearOrderNumber());
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={cn(burgerConstructorStyles.constructor, 'custom-scroll')}
      ref={dropTarget}
    >
      <ConstructorIngredient
        id={bunIngredient._id}
        elType="top"
        extraText="(верх)"
      />
      <div
        className={cn(
          burgerConstructorStyles.ingredients_middle,
          'custom-scroll',
          'p-2'
        )}
      >
        {midIngredientsIds.map((id, index) => (
          <ConstructorIngredient key={id} id={id} index={index} />
        ))}
      </div>
      <ConstructorIngredient
        id={bunIngredient._id}
        elType="bottom"
        extraText="(низ)"
      />
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
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={placeOrder}
          disabled={!totalPrice}
        >
          Оформить заказ
        </Button>
      </div>
      {modalIsVisible && (
        <Modal onClose={handleCloseModal} title="">
          {failCreatingOrder ? (
            <p className="text text_type_main-default">
              К сожалению возникли технические недоладки. Попробуйте оформить
              заказ еще раз.
            </p>
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  );
};
