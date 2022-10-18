import { selectBurgerIngredientById } from '../selectors/ingredients';
import { selectConstructorBunIngredientId } from '../selectors/constructor';
import { getIdFromConstructorIngredientId } from '../../utils/util-functions';
import { addIngredient, removeIngredient } from '../slices/constructor';
import {
  decrementIngredientAmount,
  incrementIngredientAmount,
} from '../slices/ingredients';

export function addIngredientToConstructor(id) {
  return function (dispatch, getState) {
    const state = getState();
    const currentBunId = getIdFromConstructorIngredientId(
      selectConstructorBunIngredientId(state)
    );
    if (currentBunId === id) {
      return;
    }
    const ingredientType = selectBurgerIngredientById(state, id).type;
    dispatch(addIngredient({ id, type: ingredientType }));
    if (currentBunId && ingredientType === 'bun') {
      dispatch(decrementIngredientAmount({ id: currentBunId }));
    }
    dispatch(incrementIngredientAmount({ id }));
  };
}

export function removeIngredientFromConstructor(id, index) {
  return function (dispatch) {
    dispatch(removeIngredient({ index }));
    dispatch(
      decrementIngredientAmount({ id: getIdFromConstructorIngredientId(id) })
    );
  };
}
