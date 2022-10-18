import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bunIngredientId: null,
  middleIngredientIds: null,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload: { id, type } }) => {
      if (type === 'bun') {
        return {
          ...state,
          bunIngredientId: id,
        };
      }
      const newMiddleIngredients = state.middleIngredientIds
        ? [...state.middleIngredientIds, id]
        : [id];
      return {
        ...state,
        middleIngredientIds: newMiddleIngredients,
      };
    },
    removeIngredient: (state, { payload: { id, index } }) => {
      const newMiddleIngredientIds = [...state.middleIngredientIds];
      newMiddleIngredientIds.splice(index, 1);
      return {
        ...state,
        middleIngredientIds: newMiddleIngredientIds,
      };
    },
    changeIngredientsOrder: (state, { payload: { oldIndex, newIndex } }) => {
      const id = state.middleIngredientIds[oldIndex];
      const updatedMiddleIngredientIds = state.middleIngredientIds.filter(
        (_, index) => index !== oldIndex
      );
      updatedMiddleIngredientIds.splice(newIndex, 0, id);
      return {
        ...state,
        middleIngredientIds: updatedMiddleIngredientIds,
      };
    },
    clearConstructor: _ => {
      return initialState;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  changeIngredientsOrder,
  clearConstructor,
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
