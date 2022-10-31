import { createSlice, nanoid } from '@reduxjs/toolkit';
import { onNewOrder } from '../thunks/order';

const initialState = {
  bunIngredientId: null,
  middleIngredientIds: null,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload: { constructorId, ingredientId, type } }) => {
        const newIngredient = { constructorId, ingredientId };
        if (type === 'bun') {
          return {
            ...state,
            bunIngredientId: newIngredient,
          };
        }
        const updatedMiddleIngredients = state.middleIngredientIds
          ? [...state.middleIngredientIds, newIngredient]
          : [newIngredient];
        return {
          ...state,
          middleIngredientIds: updatedMiddleIngredients,
        };
      },
      prepare: ({ ingredientId, type }) => {
        return { payload: { constructorId: nanoid(), ingredientId, type } };
      },
    },
    removeIngredient: (state, { payload: { index } }) => {
      const updatedMiddleIngredientIds = [...state.middleIngredientIds];
      updatedMiddleIngredientIds.splice(index, 1);
      return {
        ...state,
        middleIngredientIds: updatedMiddleIngredientIds,
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
  },
  extraReducers: builder => {
    builder.addCase(onNewOrder.fulfilled, _ => initialState);
  },
});

export const { addIngredient, removeIngredient, changeIngredientsOrder } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
