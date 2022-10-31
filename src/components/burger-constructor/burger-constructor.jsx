import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { OrderError } from '../order-error/order-error';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { Loader } from '../loader/loader';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectConstructorBunIngredient,
  selectConstructorMiddleIngredientIds,
} from '../../services/selectors/constructor';
import { selectTotalPrice } from '../../services/selectors/ingredients';
import { onNewOrder } from '../../services/thunks/order';
import { addIngredientToConstructor } from '../../services/thunks/constructor';
import { selectOrderState } from '../../services/selectors/order';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/const-variables/ingredient-variables';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';
import { selectIsLoggedIn } from '../../services/selectors/user-admission';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/const-variables/route-variables';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading: isOrderLoading, isFailed: isOrderFailed } =
    useSelector(selectOrderState);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const bunIngredient =
    useSelector(selectConstructorBunIngredient) || BUN_INGREDIENT_PLACEHOLDER;
  const midIngredientsIds =
    useSelector(selectConstructorMiddleIngredientIds) || [];
  const totalPrice = useSelector(selectTotalPrice) ?? 0;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ id }) {
      dispatch(addIngredientToConstructor(id));
    },
  });

  const placeOrder = () => {
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE);
    } else {
      dispatch(onNewOrder());
      setModalIsVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalIsVisible(false);
  };

  return isOrderLoading ? (
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
          <ConstructorIngredient
            key={id.constructorId}
            id={id.ingredientId}
            index={index}
          />
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
          <span className="text text_type_digits-medium">{totalPrice}</span>
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
        <Modal onClose={handleCloseModal}>
          {isOrderFailed ? <OrderError /> : <OrderDetails />}
        </Modal>
      )}
    </div>
  );
};
