import { v4 as uuid } from 'uuid';

export const generateConstructorIngredientId = id => {
  return `${id}_${uuid().slice(0, 8)}`;
};

export const getIdFromConstructorIngredientId = id => {
  return id.split('_')[0];
};
