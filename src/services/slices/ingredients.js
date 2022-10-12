import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isFailed: false,
  burgerIngredients: {},
  constructorIngredientIds: {
    bunIngredientId: null,
    middleIngredientIds: [],
  },
  currentIngredientId: null,
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
      };
    },
    failLoadingIngredients: state => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
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
    viewIngredientDetails: (state, { payload: { id } }) => {
      return {
        ...state,
        currentIngredientId: id,
      };
    },
    closeIngredientDetails: state => {
      return {
        ...state,
        currentIngredientId: null,
      };
    },
    incrementIngredientCount: (state, { payload: { id } }) => {
      state.burgerIngredients[id].count =
        (state.burgerIngredients[id].count || 0) + 1;
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
        },
      };
    },
    decrementIngredientCount: (state, { payload: { id } }) => {
      state.burgerIngredients[id].count = state.burgerIngredients[id].count
        ? state.burgerIngredients[id].count - 1
        : 0;
    },
  },
});

export const {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
  viewIngredientDetails,
  closeIngredientDetails,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
