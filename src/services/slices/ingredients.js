import { createSlice } from '@reduxjs/toolkit';
import { onNewOrder } from '../thunks/order';

const initialState = {
  isLoading: false,
  isFailed: false,
  burgerIngredients: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    startLoadingIngredients: state => {
      return {
        ...state,
        isLoading: true,
        isFailed: false,
        burgerIngredients: null,
      };
    },
    failLoadingIngredients: state => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        burgerIngredients: null,
      };
    },
    addBurgerIngredients: (state, { payload: { ingredients } }) => {
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        burgerIngredients: ingredients,
      };
    },
    incrementIngredientAmount: (state, { payload: { id } }) => {
      const ingredient = state.burgerIngredients[id];
      const updatedIngredient = {
        ...ingredient,
        count: ingredient.count + (ingredient.type === 'bun' ? 2 : 1),
      };
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          [id]: updatedIngredient,
        },
      };
    },
    decrementIngredientAmount: (state, { payload: { id } }) => {
      const ingredient = state.burgerIngredients[id];
      const updatedIngredient = {
        ...ingredient,
        count: ingredient.count - (ingredient.type === 'bun' ? 2 : 1),
      };
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          [id]: updatedIngredient,
        },
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(onNewOrder.fulfilled, state => {
      Object.values(state.burgerIngredients).forEach(i => (i.count = 0));
    });
  },
});

export const {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
  incrementIngredientAmount,
  decrementIngredientAmount,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
