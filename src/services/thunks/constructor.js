import { selectBurgerIngredientById } from '../selectors/ingredients';
import { selectConstructorBunIngredientId } from '../selectors/constructor';
import { addIngredient, removeIngredient } from '../slices/constructor';
import {
  decrementIngredientAmount,
  incrementIngredientAmount,
} from '../slices/ingredients';

export function addIngredientToConstructor(id) {
  return function (dispatch, getState) {
    const state = getState();
    const currentBunId = selectConstructorBunIngredientId(state);
    if (currentBunId === id) {
      return;
    }
    const ingredient = selectBurgerIngredientById(state, id);
    dispatch(
      addIngredient({ ingredientId: ingredient._id, type: ingredient.type })
    );
    if (currentBunId && ingredient.type === 'bun') {
      dispatch(decrementIngredientAmount({ id: currentBunId }));
    }
    dispatch(incrementIngredientAmount({ id }));
  };
}

export function removeIngredientFromConstructor(id, index) {
  return function (dispatch) {
    dispatch(removeIngredient({ index }));
    dispatch(decrementIngredientAmount({ id }));
  };
}
