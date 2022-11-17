import { createSelector } from '@reduxjs/toolkit';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from './constructor';
import { RootState } from '../store';
import {
  IBurgerIngredient,
  IBurgerIngredientWithAmount,
  IConstructorId,
  IngredientTypesEnum,
  TIngredientsObj,
} from '../../utils/ts-types/ingredient-types';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/const-variables/ingredient-variables';

export const selectBurgerIngredients = (
  state: RootState
): Array<IBurgerIngredient> | null =>
  state.ingredients.burgerIngredients &&
  Object.values(state.ingredients.burgerIngredients);

export const selectBurgerIngredientsState = (state: RootState): IFetchState => {
  return {
    isLoading: state.ingredients.isLoading,
    isFailed: state.ingredients.isFailed,
  };
};

export const selectBurgerIngredientById = (
  state: RootState,
  id: string
): IBurgerIngredient | undefined => state.ingredients.burgerIngredients?.[id];

export const selectBurgerIngredientWithCountById = createSelector(
  (state: RootState, id: string) =>
    [state, selectBurgerIngredientById(state, id)] as [
      RootState,
      IBurgerIngredient | null
    ],
  ([state, ingredient]: [
    state: RootState,
    ingredient: IBurgerIngredient | null
  ]): IBurgerIngredientWithAmount => {
    const count: number =
      ingredient!.type === IngredientTypesEnum.BUN
        ? selectConstructorBunIngredientId(state) === ingredient!._id
          ? 2
          : 0
        : selectConstructorMiddleIngredientIds(state)?.filter(
            (i: IConstructorId) => i.ingredientId === ingredient!._id
          )?.length ?? 0;
    return { ...ingredient!, count };
  }
);

export const selectTotalPrice = createSelector(
  (state: RootState) => state.ingredients.burgerIngredients,
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
  (
    ingredients: TIngredientsObj | null,
    bunId: string | null,
    midIds: Array<IConstructorId> | null
  ): number => {
    return (
      (ingredients?.[bunId ?? BUN_INGREDIENT_PLACEHOLDER._id]?.price || 0) * 2 +
      (midIds?.reduce(
        (acc: number, id: IConstructorId) =>
          acc + ingredients![id.ingredientId].price,
        0
      ) || 0)
    );
  }
);
