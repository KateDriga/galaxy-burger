import { createSlice } from '@reduxjs/toolkit';
import { onNewOrder } from '../thunks/order';

const initialState = {
  orderNumber: null,
  isLoading: false,
  isFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(onNewOrder.fulfilled, (state, { payload: data }) => {
        state.orderNumber = data.order.number;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(onNewOrder.pending, state => {
        state.orderNumber = null;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(onNewOrder.rejected, state => {
        state.orderNumber = null;
        state.isLoading = false;
        state.isFailed = true;
      });
  },
});

export const orderReducer = orderSlice.reducer;
