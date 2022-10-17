import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderNumber: null,
  isLoading: false,
  isFailed: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startCreatingOrder: state => {
      return {
        ...state,
        isLoading: true,
        isFailed: false,
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
        ...state,
        isLoading: false,
        isFailed: false,
        orderNumber: orderNumber,
      };
    },
    clearOrderNumber: state => {
      return {
        ...state,
        orderNumber: null,
      };
    },
  },
});

export const {
  startCreatingOrder,
  failCreatingOrder,
  saveOrderNumber,
  clearOrderNumber,
} = ordersSlice.actions;
export const orderReducer = ordersSlice.reducer;
