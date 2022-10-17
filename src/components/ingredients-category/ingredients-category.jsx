import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import ingredientsCategoryStyles from './ingredients-category.module.css';
import PropTypes from 'prop-types';

export const IngredientsCategory = ({ title, ingredientIds, categoryRef }) => {
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

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLDivElement) }),
  ]),
};
