import { createSelector } from '@reduxjs/toolkit';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from './constructor';

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

export const selectBurgerIngredientWithCountById = createSelector(
  (state, id) => [state, selectBurgerIngredientById(state, id)],
  ([state, ingredient]) => {
    const count =
      ingredient.type === 'bun'
        ? selectConstructorBunIngredientId(state) === ingredient._id
          ? 2
          : 0
        : selectConstructorMiddleIngredientIds(state)?.filter(
            i => i.ingredientId === ingredient._id
          )?.length ?? 0;
    return { ...ingredient, count };
  }
);

export const selectTotalPrice = createSelector(
  state => state.ingredients.burgerIngredients,
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
  (ingredients, bunId, midIds) => {
    return (
      (ingredients?.[bunId]?.price || 0) * 2 +
      (midIds?.reduce(
        (acc, id) => acc + ingredients[id.ingredientId].price,
        0
      ) || 0)
    );
  }
);
