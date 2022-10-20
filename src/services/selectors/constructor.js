export const selectConstructorBunIngredientId = state =>
  state.burgerConstructor.bunIngredientId?.ingredientId;

export const selectConstructorBunIngredient = state =>
  state.burgerConstructor.bunIngredientId &&
  state.ingredients.burgerIngredients?.[
    state.burgerConstructor.bunIngredientId.ingredientId
  ];

export const selectConstructorMiddleIngredientIds = state =>
  state.burgerConstructor.middleIngredientIds;
