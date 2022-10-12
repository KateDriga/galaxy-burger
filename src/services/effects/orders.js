import {
  failCreatingOrder,
  saveOrderNumber,
  startCreatingOrder,
} from '../slices/orders';
import { createOrder } from '../../utils/burger-api';
import { selectConstructorIngredientIds } from '../selectors/ingredients';

export function placeNewOrder() {
  return function (dispatch, getState) {
    const state = getState();
    const ingredientIds = selectConstructorIngredientIds(state);
    dispatch(startCreatingOrder());
    createOrder([
      ingredientIds.bunIngredientId,
      ...ingredientIds.middleIngredientIds,
    ])
      .then(res => res.order)
      .then(order => dispatch(saveOrderNumber(order.number)))
      .catch(error => {
        console.error(error);
        dispatch(failCreatingOrder());
      });
  };
}
