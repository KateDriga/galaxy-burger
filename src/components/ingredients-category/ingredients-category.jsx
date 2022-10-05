import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import ingredientsCategoryStyles from './ingredients-category.module.css';
import PropTypes from 'prop-types';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';

export const IngredientsCategory = ({ title, ingredients, categoryRef }) => {
  return (
    <div ref={categoryRef}>
      <h3 className="text text_type_main-medium pt-10">{title}</h3>
      <div className={ingredientsCategoryStyles.ingredients}>
        {ingredients.map(i => (
          <BurgerIngredient key={i._id} ingredient={i} />
        ))}
      </div>
    </div>
  );
};

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPES).isRequired,
  categoryRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLDivElement) }),
  ]),
};
