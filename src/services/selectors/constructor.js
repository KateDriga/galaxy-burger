import { getIdFromConstructorIngredientId } from '../../utils/util-functions';

export const selectConstructorBunIngredientId = state =>
  state.burgerConstructor.bunIngredientId;

export const selectConstructorBunIngredient = state =>
  state.burgerConstructor.bunIngredientId &&
  state.ingredients.burgerIngredients?.[
    getIdFromConstructorIngredientId(state.burgerConstructor.bunIngredientId)
  ];

export const selectConstructorMiddleIngredientIds = state =>
  state.burgerConstructor.middleIngredientIds;
