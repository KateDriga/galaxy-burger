import {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
} from '../slices/ingredients';
import { getIngredients } from '../../utils/burger-api';
import { selectBurgerIngredients } from '../selectors/ingredients';

export function loadIngredients() {
  return function (dispatch, getState) {
    const state = getState();
    const burgerIngredients = selectBurgerIngredients(state);
    if (burgerIngredients.length > 0) {
      return;
    }
    dispatch(startLoadingIngredients());
    getIngredients()
      .then(res => res.data)
      .then(ingredients => {
        const ingredientsObj = ingredients.reduce(
          (acc, ing) => ({ ...acc, [ing._id]: ing }),
          {}
        );
        dispatch(addBurgerIngredients({ ingredients: ingredientsObj }));
      })
      .catch(error => {
        console.error(error);
        dispatch(failLoadingIngredients());
      });
  };
}
