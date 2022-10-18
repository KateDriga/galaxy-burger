import {
  failCreatingOrder,
  saveOrderNumber,
  startCreatingOrder,
} from '../slices/order';
import { createOrder } from '../../utils/burger-api';
import { getIdFromConstructorIngredientId } from '../../utils/util-functions';
import { clearIngredientsCount } from '../slices/ingredients';
import { clearConstructor } from '../slices/constructor';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from '../selectors/constructor';

export function placeNewOrder() {
  return function (dispatch, getState) {
    const state = getState();
    const bunId = getIdFromConstructorIngredientId(
      selectConstructorBunIngredientId(state)
    );
    const middleConstructorIds =
      selectConstructorMiddleIngredientIds(state) || [];
    const middleIngredientIds = middleConstructorIds.map(id =>
      getIdFromConstructorIngredientId(id)
    );
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
        console.error(error);
        dispatch(failCreatingOrder());
      });
  };
}
