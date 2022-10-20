import { selectBurgerIngredientById } from './ingredients';

export const selectModalIngredientId = state => state.modal.ingredientId;

export const selectModalIngredient = state =>
  selectBurgerIngredientById(state, state.modal.ingredientId);
