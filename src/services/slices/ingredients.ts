import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { IIngredientsObj } from '../../utils/ts-types/ingredient-types';

interface IInitialState extends IFetchState {
  burgerIngredients: IIngredientsObj | null;
}

const initialState: IInitialState = {
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
    addBurgerIngredients: (state, action: PayloadAction<IIngredientsObj>) => {
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        burgerIngredients: action.payload,
      };
    },
  },
});

export const {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
