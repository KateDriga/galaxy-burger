import blankImage from '../../images/blank-image.png';
import {
  IBurgerIngredient,
  IngredientTypesEnum,
} from '../ts-types/ingredient-types';

export const BUN_INGREDIENT_PLACEHOLDER: IBurgerIngredient = {
  _id: '0000000000000000',
  name: 'Перетащите булку в это поле \u{1F959}',
  type: IngredientTypesEnum.BUN,
  price: 0,
  image: blankImage,
  image_mobile: blankImage,
};
