export interface IOrder {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number;
  readonly price: number;
}
