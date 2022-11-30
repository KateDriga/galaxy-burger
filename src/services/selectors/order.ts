import { RootState } from '../store';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { selectBurgerIngredientsByIds } from './ingredients';
import { createSelector } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../../utils/ts-types/ingredient-types';

export const selectOrderState = (state: RootState): IFetchState => {
  return {
    isLoading: state.order.isLoading,
    isFailed: state.order.isFailed,
  };
};

export const selectShowOrderModal = (state: RootState): boolean =>
  state.order.showModal;

export const selectOrderNumber = (state: RootState): number | null =>
  state.order.orderNumber;

export const selectOrderPrice = createSelector(
  (state: RootState, ids: Array<string>) =>
    selectBurgerIngredientsByIds(state, ids),
  (ingredients: Array<IBurgerIngredient | undefined>): number =>
    ingredients.reduce(
      (acc: number, ing: IBurgerIngredient | undefined) =>
        acc + (ing?.price || 0),
      0
    )
);
