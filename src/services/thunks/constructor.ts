import { selectBurgerIngredientById } from '../selectors/ingredients';
import { selectConstructorBunIngredientId } from '../selectors/constructor';
import { addIngredient, removeIngredient } from '../slices/constructor';
import { AppDispatch, RootState } from '../store';
import {
  IAddIngredient,
  IBurgerIngredient,
} from '../../utils/ts-types/ingredient-types';

export function addIngredientToConstructor(
  id: string
): (dispatch: AppDispatch, getState: RootState) => void {
  return function (dispatch: AppDispatch, getState: RootState) {
    const state: RootState = getState();
    const currentBunId: string | null = selectConstructorBunIngredientId(state);
    if (currentBunId === id) {
      return;
    }
    const ingredient: IBurgerIngredient = selectBurgerIngredientById(
      state,
      id
    )!;
    const ingredientToAdd: IAddIngredient = {
      ingredientId: ingredient._id,
      type: ingredient.type,
    };
    dispatch(addIngredient(ingredientToAdd));
  };
}

export function removeIngredientFromConstructor(
  index: number
): (dispatch: AppDispatch) => void {
  return function (dispatch: AppDispatch) {
    dispatch(removeIngredient(index));
  };
}
