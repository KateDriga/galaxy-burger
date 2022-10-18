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
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
