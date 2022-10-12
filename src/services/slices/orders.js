import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderNumber: null,
  ingredientIds: [],
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
    saveOrderNumber: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        orderNumber: payload,
      };
    },
  },
});

export const { startCreatingOrder, failCreatingOrder, saveOrderNumber } =
  ordersSlice.actions;
export const orderReducer = ordersSlice.reducer;
