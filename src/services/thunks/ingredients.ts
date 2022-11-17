import {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
} from '../slices/ingredients';
import { getIngredients } from '../../utils/api/rest/ingredients';
import { selectBurgerIngredients } from '../selectors/ingredients';
import { AppDispatch, RootState } from '../store';
import {
  IBurgerIngredient,
  TIngredientsObj,
} from '../../utils/ts-types/ingredient-types';
import { AxiosResponse } from 'axios';
import { IIngredientsData } from '../../utils/ts-types/api-types';

export function loadIngredients(): (
  dispatch: AppDispatch,
  getState: () => RootState
) => void {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const state: RootState = getState();
    const burgerIngredients: Array<IBurgerIngredient> | null =
      selectBurgerIngredients(state);
    if (burgerIngredients) {
      return;
    }
    dispatch(startLoadingIngredients());
    getIngredients()
      .then((res: AxiosResponse<IIngredientsData>) => {
        const ingredientsObj: TIngredientsObj = res.data.data.reduce(
          (acc, ing: IBurgerIngredient) => ({ ...acc, [ing._id]: ing }),
          {}
        );
        dispatch(addBurgerIngredients(ingredientsObj));
      })
      .catch(error => {
        console.error('Loading ingredients error', error);
        dispatch(failLoadingIngredients());
      });
  };
}
