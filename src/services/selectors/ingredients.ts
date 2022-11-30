import { createSelector } from '@reduxjs/toolkit';
import {
  selectConstructorBunIngredientId,
  selectConstructorMiddleIngredientIds,
} from './constructor';
import { RootState } from '../store';
import {
  BurgerIngredient,
  IBurgerIngredient,
  IBurgerIngredientWithAmount,
  IConstructorId,
  IngredientTypesEnum,
  IIngredientsObj,
} from '../../utils/ts-types/ingredient-types';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { BUN_INGREDIENT_PLACEHOLDER } from '../../utils/const-variables/ingredient-variables';
import unknownIngImage from '../../images/unknown-ingredient.png';
import {
  IOrderIngredient,
  OrderIngredient,
} from '../../utils/ts-types/order-types';

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

export const selectBurgerIngredientsByIds = (
  state: RootState,
  ids: Array<string>
): Array<IBurgerIngredient | undefined> =>
  ids.map((id: string) => state.ingredients.burgerIngredients?.[id]);

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
    ingredients: IIngredientsObj | null,
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

export const selectOrderImagesByIngIds = createSelector(
  (state: RootState, ids: Array<string>) =>
    selectBurgerIngredientsByIds(state, ids),
  (ingredients: Array<IBurgerIngredient | undefined>): Array<string> =>
    ingredients.map(
      (ing: IBurgerIngredient | undefined) =>
        ing?.image_mobile || unknownIngImage
    )
);

const selectOrderIngredientIdsWithCount = (
  state: RootState,
  ids: Array<string>
): Array<IBurgerIngredientWithAmount> => {
  const groupedIds: Record<string, number> = ids.reduce(
    (acc: Record<string, number>, ing: string) => {
      return { ...acc, [ing]: (acc[ing] || 0) + 1 };
    },
    {}
  );
  return Object.keys(groupedIds).map((id: string) => {
    const ingredient: IBurgerIngredient =
      selectBurgerIngredientById(state, id) || new BurgerIngredient(id);
    return { ...ingredient, count: groupedIds[id] };
  });
};

export const selectOrderIngredientDetails = createSelector(
  (state: RootState, ids: Array<string> | undefined) =>
    !ids ? null : selectOrderIngredientIdsWithCount(state, ids),
  (
    ingredients: Array<IBurgerIngredientWithAmount> | null
  ): Array<IOrderIngredient> | null =>
    ingredients?.map(
      (ing: IBurgerIngredientWithAmount) =>
        new OrderIngredient(ing._id, ing.name, ing.image, ing.price, ing.count)
    ) ?? null
);
