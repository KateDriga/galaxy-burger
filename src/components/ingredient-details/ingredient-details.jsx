import { useSelector } from 'react-redux';
import { selectModalIngredient } from '../../services/selectors/modal';
import ingredientDetailsStyles from './ingredient-details.module.css';
import cn from 'classnames';

export const IngredientDetails = () => {
  const ingredient = useSelector(selectModalIngredient);

  return (
    <>
      <img
        alt="Burger Item"
        src={ingredient.image_mobile}
        srcSet={`${ingredient.image_large || ingredient.image} 1000w`}
        className={ingredientDetailsStyles.ingredient_image}
      />
      <h2
        className={cn(
          ingredientDetailsStyles.ingredient_name,
          'text text_type_main-medium'
        )}
      >
        {ingredient.name}
      </h2>
      <ul
        className={cn(ingredientDetailsStyles.nutrition_list, 'pt-8', 'pb-5')}
      >
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Калории, ккал</span>
          <span className="text_type_digits-default">
            {ingredient.calories || '-'}
          </span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Белки, г</span>
          <span className="text_type_digits-default">
            {ingredient.proteins || '-'}
          </span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Жиры, г</span>
          <span className="text_type_digits-default">
            {ingredient.fat || '-'}
          </span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Углеводы, г</span>
          <span className="text_type_digits-default">
            {ingredient.carbohydrates || '-'}
          </span>
        </li>
      </ul>
    </>
  );
};
