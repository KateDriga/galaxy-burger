import { OrderStatusEnum } from '../ts-types/order-types';

export const MAX_CARD_INGREDIENTS: number = 6;

export const ORDER_STATUS_DESCRIPTION: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.DONE]: 'Выполнен',
  [OrderStatusEnum.CREATED]: 'Создан',
  [OrderStatusEnum.PENDING]: 'Готовится',
};
