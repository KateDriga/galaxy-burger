import { FC } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { selectBurgerIngredientWithCountById } from '../../services/selectors/ingredients';
import { Link, useLocation, Location } from 'react-router-dom';
import { NavRoutesEnum } from '../../utils/ts-types/route-types';
import { useAppSelector } from '../../hooks/useStore';
import { IBurgerIngredientWithAmount } from '../../utils/ts-types/ingredient-types';
import burgerIngredientStyles from './burger-ingredient.module.css';
import {
  DragNDropTypes,
  TCollectedProps,
  TIngredientDragObject,
  TDropResult,
} from '../../utils/ts-types/drag-n-drop-types';

export const BurgerIngredient: FC<{ readonly ingredientId: string }> = ({
  ingredientId,
}) => {
  const location: Location = useLocation();

  const ingredient: IBurgerIngredientWithAmount = useAppSelector(state =>
    selectBurgerIngredientWithCountById(state, ingredientId)
  );

  const [{ opacity }, dragRef] = useDrag<
    TIngredientDragObject,
    TDropResult,
    TCollectedProps
  >({
    type: DragNDropTypes.INGREDIENT,
    item: { id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <Link
      style={{ opacity }}
      className={burgerIngredientStyles.burger_ingredient}
      ref={dragRef}
      to={NavRoutesEnum.INGREDIENT_ROUTE.replace(':id', ingredientId)}
      state={{ background: location }}
    >
      {ingredient.count > 0 && (
        <Counter count={ingredient.count} size="default" />
      )}
      <img
        className={burgerIngredientStyles.burger_image}
        alt="Burger Item"
        src={ingredient.image_mobile}
        srcSet={`${ingredient.image} 1000w`}
      />
      <p
        className={`${burgerIngredientStyles.burger_price} text text_type_digits-default p-1`}
      >
        <span>{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p
        className={`${burgerIngredientStyles.burger_name} text text_type_main-default`}
      >
        {ingredient.name}
      </p>
    </Link>
  );
};
