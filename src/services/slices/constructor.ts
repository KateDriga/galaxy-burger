import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { onNewOrder } from '../thunks/order';
import {
  IAddIngredient,
  IAddIngredientWithConstructorId,
  IChangeIngredientsOrder,
  IConstructorId,
  IngredientTypesEnum,
} from '../../utils/ts-types/ingredient-types';

interface IInitialState {
  bunIngredientId: IConstructorId | null;
  middleIngredientIds: Array<IConstructorId> | null;
}

const initialState: IInitialState = {
  bunIngredientId: null,
  middleIngredientIds: null,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<IAddIngredientWithConstructorId>
      ) => {
        const newIngredientId: IConstructorId = action.payload;
        if (action.payload.type === IngredientTypesEnum.BUN) {
          state.bunIngredientId = newIngredientId;
          return state;
        }
        state.middleIngredientIds ||= [];
        state.middleIngredientIds.push(newIngredientId);
        return state;
      },
      prepare: (ingredientToAdd: IAddIngredient) => {
        return { payload: { ...ingredientToAdd, constructorId: nanoid() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.middleIngredientIds!.splice(action.payload, 1);
      return state;
    },
    changeIngredientsOrder: (
      state,
      action: PayloadAction<IChangeIngredientsOrder>
    ) => {
      const id = state.middleIngredientIds![action.payload.oldIndex];
      state.middleIngredientIds = state.middleIngredientIds!.filter(
        (_, index) => index !== action.payload.oldIndex
      );
      state.middleIngredientIds.splice(action.payload.newIndex, 0, id);
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(onNewOrder.fulfilled, _ => initialState);
  },
});

export const { addIngredient, removeIngredient, changeIngredientsOrder } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
