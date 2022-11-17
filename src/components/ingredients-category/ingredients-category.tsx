import { FC } from 'react';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { IIngredientsCategory } from '../../utils/ts-types/ingredient-types';
import ingredientsCategoryStyles from './ingredients-category.module.css';

export const IngredientsCategory: FC<IIngredientsCategory> = ({
  title,
  ingredientIds,
  categoryRef,
}) => {
  return (
    <div ref={categoryRef}>
      <h3 className="text text_type_main-medium pt-10">{title}</h3>
      <div className={ingredientsCategoryStyles.ingredients}>
        {ingredientIds.map(i => (
          <BurgerIngredient key={i} ingredientId={i} />
        ))}
      </div>
    </div>
  );
};
