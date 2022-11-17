import { createOrder } from '../../utils/api/rest/orders';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from '../selectors/constructor';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrderData } from '../../utils/ts-types/api-types';
import { RootState } from '../store';
import { IConstructorId } from '../../utils/ts-types/ingredient-types';
import { AxiosResponse } from 'axios';
import { IOrder } from '../../utils/ts-types/order-types';

export const onNewOrder = createAsyncThunk<IOrder, void, { state: RootState }>(
  'order/onNewOrder',
  async (_, { getState }) => {
    const state: RootState = getState();
    const bunId: string | null = selectConstructorBunIngredientId(state);
    const middleConstructorIds: Array<IConstructorId> =
      selectConstructorMiddleIngredientIds(state) || [];
    const middleIngredientIds: Array<string> = middleConstructorIds.map(
      id => id.ingredientId
    );
    try {
      const { data }: AxiosResponse<IOrderData> = await createOrder(
        [bunId!, ...middleIngredientIds, bunId!].filter(id => id !== null)
      );
      return data.order;
    } catch (err: any) {
      console.error('Order error:', err);
      throw new Error(err);
    }
  }
);
