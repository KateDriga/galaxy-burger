import doneImage from '../../images/done.png';
import orderDetailsStyles from './order-details.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { OrderContext } from '../services/app-context';

export const OrderDetails = () => {
  const { orderNumber } = useContext(OrderContext);
  return (
    <>
      <h1
        className={cn(orderDetailsStyles.order, 'text text_type_digits-large')}
      >
        {orderNumber ? orderNumber.toString().padStart(6, '0') : '-'}
      </h1>
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-medium pt-8'
        )}
      >
        идентификатор заказа
      </p>
      <img className="p-15" src={doneImage} alt="Success" />
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-default'
        )}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-default text_color_inactive pt-2'
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
