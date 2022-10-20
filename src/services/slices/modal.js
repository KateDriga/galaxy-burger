import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredientId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIngredientId: (state, { payload: { id } }) => {
      return {
        ingredientId: id,
      };
    },
    clearModalIngredientId: _ => {
      return {
        ingredientId: null,
      };
    },
  },
});

export const { setModalIngredientId, clearModalIngredientId } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
