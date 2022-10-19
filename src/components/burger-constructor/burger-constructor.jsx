import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useContext, useMemo, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';
import { ConstructorContext, OrderContext } from '../services/app-context';
import { DEFAULT_BUN_INGREDIENT } from '../../utils/appConstVariables';
import { REMOVE_INGREDIENT } from '../services/actions/constructor-actions';
import { placeOrder } from '../../utils/burger-api';

export const BurgerConstructor = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const { constructorIngredients, constructorDispatcher } =
    useContext(ConstructorContext);
  const { setOrderNumber } = useContext(OrderContext);

  const { bunIngredient, midIngredients } = useMemo(() => {
    return {
      bunIngredient:
        constructorIngredients.bunIngredient || DEFAULT_BUN_INGREDIENT,
      midIngredients: constructorIngredients.middleIngredients || [],
    };
  }, [constructorIngredients]);
  const removeIngredient = (id, idx) =>
    constructorDispatcher({ type: REMOVE_INGREDIENT, payload: { id, idx } });

  const totalPrice = useMemo(() => {
    return (
      bunIngredient.price * 2 +
      midIngredients.map(i => i.price).reduce((a, b) => a + b, 0)
    );
  }, [bunIngredient, midIngredients]);

  const createOrder = () => {
    if (totalPrice > 0) {
      const bunId = constructorIngredients.bunIngredient?._id;
      const midIds = midIngredients.map(i => i._id);
      placeOrder([bunId, ...midIds, bunId].filter(id => id !== null))
        .then(res => res.order)
        .then(order => setOrderNumber(order.number))
        .catch(_ => setOrderNumber(null));
      setModalIsVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalIsVisible(false);
    setOrderNumber(null);
  };

  return (
    <div className={cn(burgerConstructorStyles.constructor, 'custom-scroll')}>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunIngredient.name} (верх)`}
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
        {midIngredients.map((i, idx) => (
          <div
            // Temporary  solution for context
            // TODO will be replaced with nanoid (redux)
            key={`${i._id}_${idx}`}
            className={burgerConstructorStyles.constructor_element_row}
          >
            <DragIcon type="primary" />
            <div className={cn(burgerConstructorStyles.constructor_element)}>
              <ConstructorElement
                text={i.name}
                price={i.price}
                thumbnail={i.image_mobile}
                handleClose={() => removeIngredient(i._id, idx)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunIngredient.name} (низ)`}
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
            onClick={createOrder}
          >
            Оформить заказ
          </Button>
        )}
      </div>
      {modalIsVisible && (
        <Modal onClose={handleCloseModal} title="">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
