import {
  failCreatingOrder,
  saveOrderNumber,
  startCreatingOrder,
} from '../slices/orders';
import { createOrder } from '../../utils/burger-api';
import { selectConstructorIngredientIds } from '../selectors/ingredients';
import { getIdFromConstructorIngredientId } from '../../utils/util-functions';
import { clearConstructorIngredients } from '../slices/ingredients';

export function placeNewOrder() {
  return function (dispatch, getState) {
    const state = getState();
    const ingredientIds = selectConstructorIngredientIds(state);
    const middleIngredientIds = ingredientIds.middleIngredientIds.map(id =>
      getIdFromConstructorIngredientId(id)
    );
    dispatch(startCreatingOrder());
    createOrder([
      ingredientIds.bunIngredientId,
      ...middleIngredientIds,
      ingredientIds.bunIngredientId,
    ])
      .then(res => res.order)
      .then(order => {
        dispatch(saveOrderNumber({ orderNumber: order.number }));
        dispatch(clearConstructorIngredients());
      })
      .catch(error => {
        console.error(error);
        dispatch(failCreatingOrder());
      });
  };
}
