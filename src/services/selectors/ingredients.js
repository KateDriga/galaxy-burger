import { getIdFromConstructorIngredientId } from '../../utils/util-functions';

export const selectBurgerIngredients = state =>
  state.ingredients.burgerIngredients &&
  Object.values(state.ingredients.burgerIngredients);

export const selectBurgerIngredientsLoading = state =>
  state.ingredients.isLoading;

export const selectFailLoadingIngredients = state => state.ingredients.isFailed;

export const selectBurgerIngredientById = (state, id) =>
  state.ingredients.burgerIngredients?.[id];

export const selectTotalPrice = (state, bunId, midIngredientsIds = []) => {
  const bunIngredientPrice =
    selectBurgerIngredientById(state, bunId)?.price * 2 || 0;
  const midIngredientsPrice = midIngredientsIds?.reduce((acc, id) => {
    return (
      acc +
      selectBurgerIngredientById(state, getIdFromConstructorIngredientId(id))
        .price
    );
  }, 0);
  return bunIngredientPrice + midIngredientsPrice;
};
