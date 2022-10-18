import { selectBurgerIngredientById } from '../selectors/ingredients';
import { selectConstructorBunIngredientId } from '../selectors/constructor';
import {
  generateConstructorIngredientId,
  getIdFromConstructorIngredientId,
} from '../../utils/util-functions';
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
    const constructorId = generateConstructorIngredientId(id);
    dispatch(addIngredient({ id: constructorId, type: ingredientType }));
    if (currentBunId && ingredientType === 'bun') {
      dispatch(decrementIngredientAmount({ id: currentBunId }));
    }
    dispatch(incrementIngredientAmount({ id }));
  };
}

export function removeIngredientFromConstructor(id, index) {
  return function (dispatch) {
    dispatch(removeIngredient({ id, index }));
    dispatch(
      decrementIngredientAmount({ id: getIdFromConstructorIngredientId(id) })
    );
  };
}