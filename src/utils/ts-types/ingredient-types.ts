import { RefObject } from 'react';

export enum IngredientTypesEnum {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export interface IBurgerIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: IngredientTypesEnum;
  readonly proteins?: number;
  readonly fat?: number;
  readonly carbohydrates?: number;
  readonly calories?: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large?: string;
  readonly __v?: number;
}

export interface IBurgerIngredientWithAmount extends IBurgerIngredient {
  readonly count: number;
}

export type TCategoryRef = RefObject<HTMLDivElement>;

export interface IIngredientsCategory {
  readonly title: string;
  readonly ingredientIds: Array<string>;
  readonly categoryRef: TCategoryRef;
}

export type TIngredientCategories = {
  readonly [type in IngredientTypesEnum]: IIngredientsCategory;
};

export interface IConstructorId {
  readonly constructorId: string;
  readonly ingredientId: string;
}

export interface TIngredientsObj {
  readonly [key: string]: IBurgerIngredient;
}

export interface IAddIngredient {
  readonly ingredientId: string;
  readonly type: IngredientTypesEnum;
}

export interface IAddIngredientWithConstructorId extends IAddIngredient {
  readonly constructorId: string;
}

export interface IChangeIngredientsOrder {
  readonly oldIndex: number;
  readonly newIndex: number;
}
