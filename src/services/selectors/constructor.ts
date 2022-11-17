import { RootState } from '../store';
import {
  IBurgerIngredient,
  IConstructorId,
} from '../../utils/ts-types/ingredient-types';

export const selectConstructorBunIngredientId = (
  state: RootState
): string | null =>
  state.burgerConstructor.bunIngredientId?.ingredientId ?? null;

export const selectConstructorBunIngredient = (
  state: RootState
): IBurgerIngredient | null =>
  state.burgerConstructor.bunIngredientId &&
  (state.ingredients.burgerIngredients?.[
    state.burgerConstructor.bunIngredientId.ingredientId
  ] ??
    null);

export const selectConstructorMiddleIngredientIds = (
  state: RootState
): Array<IConstructorId> | null => state.burgerConstructor.middleIngredientIds;
