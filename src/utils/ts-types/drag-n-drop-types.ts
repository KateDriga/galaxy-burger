export enum DragNDropTypes {
  INGREDIENT = 'ingredient',
  CONSTRUCTOR = 'constructor',
}

export type TIngredientDragObject = {
  readonly id: string;
};

export type TConstructorDragObject = {
  index: number;
};

export type TDropResult = unknown;

export type TCollectedProps = {
  readonly opacity: number;
};
