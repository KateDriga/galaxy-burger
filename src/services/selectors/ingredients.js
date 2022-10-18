export const selectBurgerIngredients = state =>
  state.ingredients.burgerIngredients &&
  Object.values(state.ingredients.burgerIngredients);

export const selectBurgerIngredientsState = state => {
  return {
    isLoading: state.ingredients.isLoading,
    isFailed: state.ingredients.isFailed,
  };
};

export const selectBurgerIngredientById = (state, id) =>
  state.ingredients.burgerIngredients?.[id];
