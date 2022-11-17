import { RootState } from '../store';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';

export const selectOrderState = (state: RootState): IFetchState => {
  return {
    isLoading: state.order.isLoading,
    isFailed: state.order.isFailed,
  };
};

export const selectOrderNumber = (state: RootState): number | null =>
  state.order.orderNumber;
