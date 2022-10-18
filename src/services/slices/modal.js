import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredientId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIngredientId: (state, { payload: { id } }) => {
      return {
        ingredientId: id,
      };
    },
    clearIngredientId: _ => {
      return {
        ingredientId: null,
      };
    },
  },
});

export const { setIngredientId, clearIngredientId } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
