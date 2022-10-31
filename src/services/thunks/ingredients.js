import {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
} from '../slices/ingredients';
import { getIngredients } from '../../utils/api/rest/ingredients';
import {
  selectBurgerIngredients,
  selectBurgerIngredientsState,
} from '../selectors/ingredients';

export function loadIngredients() {
  return function (dispatch, getState) {
    const state = getState();
    const burgerIngredients = selectBurgerIngredients(state);
    const { isLoading: ingredientsLoading } =
      selectBurgerIngredientsState(state);
    if (burgerIngredients || ingredientsLoading) {
      return;
    }
    dispatch(startLoadingIngredients());
    getIngredients()
      .then(res => {
        const ingredientsObj = res.data.data.reduce(
          (acc, ing) => ({ ...acc, [ing._id]: { ...ing, count: 0 } }),
          {}
        );
        dispatch(addBurgerIngredients({ ingredients: ingredientsObj }));
      })
      .catch(error => {
        console.error('Loading ingredients error', error);
        dispatch(failLoadingIngredients());
      });
  };
}
