import ingredientDetailsStyles from './ingredient-details.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const IngredientDetails = ({
  name,
  imgSrc,
  imgSrcMobile,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <>
      <img
        alt="Burger Item"
        src={imgSrcMobile}
        srcSet={`${imgSrc} 1000w`}
        className={ingredientDetailsStyles.ingredient_image}
      />
      <h2
        className={cn(
          ingredientDetailsStyles.ingredient_name,
          'text text_type_main-medium'
        )}
      >
        {name}
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
          <span className="text_type_digits-default">{calories || '-'}</span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Белки, г</span>
          <span className="text_type_digits-default">{proteins || '-'}</span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Жиры, г</span>
          <span className="text_type_digits-default">{fat || '-'}</span>
        </li>
        <li
          className={cn(
            ingredientDetailsStyles.nutrition_item,
            'text text_type_main-default text_color_inactive'
          )}
        >
          <span>Углеводы, г</span>
          <span className="text_type_digits-default">
            {carbohydrates || '-'}
          </span>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgSrcMobile: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};
