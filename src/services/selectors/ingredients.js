import { getIdFromConstructorIngredientId } from '../../utils/util-functions';

export const selectBurgerIngredients = state =>
  Object.values(state.ingredients.burgerIngredients);

export const selectBurgerIngredientsLoading = state =>
  state.ingredients.isLoading;

export const selectBurgerIngredientById = (state, id) =>
  state.ingredients.burgerIngredients[id];

export const selectConstructorBunIngredient = state =>
  state.ingredients.burgerIngredients[
    state.ingredients.constructorIngredientIds.bunIngredientId
  ];

export const selectConstructorMiddleIngredientIds = state =>
  state.ingredients.constructorIngredientIds.middleIngredientIds;

export const selectConstructorMiddleIngredients = state =>
  selectConstructorMiddleIngredientIds(state).map(id =>
    selectBurgerIngredientById(state, id)
  );

export const selectConstructorIngredientIds = state =>
  state.ingredients.constructorIngredientIds;

export const selectTotalPrice = state => {
  const bunIngredientPrice =
    selectConstructorBunIngredient(state)?.price * 2 || 0;
  const midIngredientsPrice =
    state.ingredients.constructorIngredientIds.middleIngredientIds.reduce(
      (acc, id) =>
        acc +
        selectBurgerIngredientById(state, getIdFromConstructorIngredientId(id))
          .price,
      0
    );
  return bunIngredientPrice + midIngredientsPrice;
};
