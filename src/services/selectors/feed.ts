import { RootState } from '../store';
import { FeedTypesEnum, IFeedStatus } from '../../utils/ts-types/feed-types';
import { IOrder, OrderStatusEnum } from '../../utils/ts-types/order-types';
import { IFeedOrdersTotal } from '../../utils/ts-types/api-types';

export const selectFeedOrders = (
  state: RootState,
  type: FeedTypesEnum
): Array<IOrder> | null =>
  state.feed[type].orders && Object.values(state.feed[type].orders!);

export const selectFeedStatus = (
  state: RootState,
  type: FeedTypesEnum
): IFeedStatus => state.feed[type].state;

export const selectFeedOrderById = (
  state: RootState,
  type: FeedTypesEnum,
  id: string
): IOrder | null => state.feed[type].orders?.[id] ?? null;

export const selectFeedAggregateData = (
  state: RootState
): IFeedOrdersTotal | null => state.feed[FeedTypesEnum.ALL].aggregate ?? null;

export const selectFeedOrdersDone = (state: RootState): Array<number> | null =>
  state.feed[FeedTypesEnum.ALL].orders &&
  Object.values(state.feed[FeedTypesEnum.ALL].orders!)
    .filter((order: IOrder) => order.status === OrderStatusEnum.DONE)
    .map((order: IOrder) => order.number);

export const selectFeedOrdersPending = (
  state: RootState
): Array<number> | null =>
  state.feed[FeedTypesEnum.ALL].orders &&
  Object.values(state.feed[FeedTypesEnum.ALL].orders!)
    .filter((order: IOrder) => order.status === OrderStatusEnum.PENDING)
    .map((order: IOrder) => order.number);
