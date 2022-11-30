import { RefObject } from 'react';
import unknownIngImage from '../../images/unknown-ingredient.png';

export enum IngredientTypesEnum {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
  UNKNOWN = 'unknown',
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

export class BurgerIngredient implements IBurgerIngredientWithAmount {
  constructor(
    public _id: string,
    public name: string = 'Секретный ингредиент',
    public type: IngredientTypesEnum = IngredientTypesEnum.UNKNOWN,
    public price: number = 0,
    public image: string = unknownIngImage,
    public image_mobile: string = unknownIngImage,
    public count: number = 0
  ) {}
}

export type TCategoryRef = RefObject<HTMLDivElement>;

export interface IIngredientsCategory {
  readonly title: string;
  readonly ingredientIds: Array<string>;
  readonly categoryRef: TCategoryRef;
}

export type TIngredientCategories = {
  readonly [type in IngredientTypesEnum as string]: IIngredientsCategory;
};

export interface IConstructorId {
  readonly constructorId: string;
  readonly ingredientId: string;
}

export interface IIngredientsObj {
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
