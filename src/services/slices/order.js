import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderNumber: null,
  isLoading: false,
  isFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startCreatingOrder: _ => {
      return {
        isLoading: true,
        isFailed: false,
        orderNumber: null,
      };
    },
    failCreatingOrder: state => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };
    },
    saveOrderNumber: (state, { payload: { orderNumber } }) => {
      return {
        isLoading: false,
        isFailed: false,
        orderNumber: orderNumber,
      };
    },
  },
});

export const { startCreatingOrder, failCreatingOrder, saveOrderNumber } =
  orderSlice.actions;
export const orderReducer = orderSlice.reducer;
