import { FC } from 'react';

export const OrderError: FC = () => {
  return (
    <p className="text text_type_main-default">
      К сожалению, возникли технические проблемы при обработке заказа.
      Попробуйте оформить заказ еще раз.
    </p>
  );
};
