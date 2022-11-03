import { selectBurgerIngredientById } from '../selectors/ingredients';
import { selectConstructorBunIngredientId } from '../selectors/constructor';
import { addIngredient, removeIngredient } from '../slices/constructor';

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
  };
}

export function removeIngredientFromConstructor(index) {
  return function (dispatch) {
    dispatch(removeIngredient({ index }));
  };
}
