import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import defaultImg from '../../images/blankImage.png';
import { ingredientPropTypes } from '../../utils/propTypes';
import burgerConstructorStyles from './burger-constructor.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ bunIngredient, midIngredients }) => {
  const totalPrice =
    bunIngredient?.price * 2 +
    midIngredients?.map(i => i.price).reduce((a, b) => a + b, 0);

  return (
    <div className={cn(burgerConstructorStyles.constructor, 'custom-scroll')}>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunIngredient?.name || 'Выберите булку'}
          price={bunIngredient?.price || 0}
          thumbnail={bunIngredient?.image_mobile || defaultImg}
        />
      </div>
      <div
        className={cn(
          burgerConstructorStyles.ingredients_middle,
          'custom-scroll',
          'p-2'
        )}
      >
        {midIngredients?.map(i => (
          <div
            key={i._id}
            className={burgerConstructorStyles.constructor_element_row}
          >
            <DragIcon type="primary" />
            <div className={cn(burgerConstructorStyles.constructor_element)}>
              <ConstructorElement
                text={i.name}
                price={i.price}
                thumbnail={i.image_mobile}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={cn(burgerConstructorStyles.constructor_element, 'pr-5')}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunIngredient?.name || 'Выберите булку'}
          price={bunIngredient?.price || 0}
          thumbnail={bunIngredient?.image_mobile || defaultImg}
        />
      </div>
      <div
        className={cn(
          burgerConstructorStyles.order_details,
          'pt-10 pr-7 pb-15'
        )}
      >
        <div className={burgerConstructorStyles.order_details_price}>
          <span className="text text_type_digits-medium">
            {totalPrice || 0}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        {totalPrice > 0 && (
          <Button type="primary" size="large" htmlType="button">
            Оформить заказ
          </Button>
        )}
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  bunIngredient: ingredientPropTypes.isRequired,
  midIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
