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
  IIngredientsObj,
} from '../../utils/ts-types/ingredient-types';
import { AxiosResponse } from 'axios';
import { IIngredientsData } from '../../utils/ts-types/api-types';
import { generateObjFromArray } from '../../utils/util-functions';

export function loadIngredients() {
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
        const ingredientsObj: IIngredientsObj =
          generateObjFromArray<IBurgerIngredient>(res.data.data);
        dispatch(addBurgerIngredients(ingredientsObj));
      })
      .catch(error => {
        console.error('Loading ingredients error', error);
        dispatch(failLoadingIngredients());
      });
  };
}
