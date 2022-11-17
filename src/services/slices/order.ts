import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onNewOrder } from '../thunks/order';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { IOrder } from '../../utils/ts-types/order-types';

interface IInitialState extends IFetchState {
  orderNumber: number | null;
}

const initialState: IInitialState = {
  orderNumber: null,
  isLoading: false,
  isFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(onNewOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.orderNumber = action.payload.number;
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
