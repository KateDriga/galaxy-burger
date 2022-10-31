import { createOrder } from '../../utils/api/rest/orders';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from '../selectors/constructor';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const onNewOrder = createAsyncThunk(
  'order/onNewOrder',
  async (_, { getState }) => {
    const state = getState();
    const bunId = selectConstructorBunIngredientId(state) || null;
    const middleConstructorIds =
      selectConstructorMiddleIngredientIds(state) || [];
    const middleIngredientIds = middleConstructorIds.map(id => id.ingredientId);
    try {
      const { data } = await createOrder(
        [bunId, ...middleIngredientIds, bunId].filter(id => id !== null)
      );
      return data;
    } catch (err) {
      console.error('Order error:', err);
      throw new Error(err);
    }
  }
);
