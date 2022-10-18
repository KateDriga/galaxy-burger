import { nanoid } from '@reduxjs/toolkit';

export const generateConstructorIngredientId = id => {
  return `${id}_${nanoid(8)}`;
};

export const getIdFromConstructorIngredientId = id => {
  return !id ? null : id.split('_')[0];
};
