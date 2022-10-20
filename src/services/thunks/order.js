import {
  failCreatingOrder,
  saveOrderNumber,
  startCreatingOrder,
} from '../slices/order';
import { createOrder } from '../../utils/burger-api';
import { clearIngredientsCount } from '../slices/ingredients';
import { clearConstructor } from '../slices/constructor';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from '../selectors/constructor';

export function placeNewOrder() {
  return function (dispatch, getState) {
    const state = getState();
    const bunId = selectConstructorBunIngredientId(state) || null;
    const middleConstructorIds =
      selectConstructorMiddleIngredientIds(state) || [];
    const middleIngredientIds = middleConstructorIds.map(id => id.ingredientId);
    dispatch(startCreatingOrder());
    createOrder(
      [bunId, ...middleIngredientIds, bunId].filter(id => id !== null)
    )
      .then(res => res.order)
      .then(order => {
        dispatch(saveOrderNumber({ orderNumber: order.number }));
        dispatch(clearIngredientsCount());
        dispatch(clearConstructor());
      })
      .catch(error => {
        console.error('Order error:', error);
        dispatch(failCreatingOrder());
      });
  };
}
