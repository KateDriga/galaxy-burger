import blankImage from '../../images/blank-image.png';

export const INGREDIENT_TABS = [
  {
    label: 'Булки',
    type: 'bun',
  },
  {
    label: 'Соусы',
    type: 'sauce',
  },
  {
    label: 'Начинки',
    type: 'main',
  },
];

export const BUN_INGREDIENT_PLACEHOLDER = {
  _id: '0000000000000000',
  name: 'Перетащите булку в это поле \u{1F959}',
  type: 'bun',
  price: 0,
  image: blankImage,
  image_mobile: blankImage,
};
