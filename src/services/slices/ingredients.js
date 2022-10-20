import { createSlice } from '@reduxjs/toolkit';

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
        count: (ingredient.count || 0) + (ingredient.type === 'bun' ? 2 : 1),
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
    clearIngredientsCount: state => {
      const newBurgerIngredients = Object.values(
        state.burgerIngredients
      ).reduce((acc, ing) => {
        const newIngredient = { ...ing };
        delete newIngredient.count;
        return { ...acc, [newIngredient._id]: newIngredient };
      }, {});

      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
      };
    },
  },
});

export const {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
  incrementIngredientAmount,
  decrementIngredientAmount,
  clearIngredientsCount,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
