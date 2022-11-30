import unknownIngImage from '../../images/unknown-ingredient.png';

export enum OrderStatusEnum {
  DONE = 'done',
  PENDING = 'pending',
  CREATED = 'created',
}

export interface IOrder {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number;
  readonly status: OrderStatusEnum;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IOrdersObj {
  [key: string]: IOrder;
}

export interface IOrderIngredient {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly count: number;
}

export class OrderIngredient implements IOrderIngredient {
  constructor(
    public id: string,
    public name: string,
    public image: string = unknownIngImage,
    public price: number = 0,
    public count: number = 0
  ) {}
}
