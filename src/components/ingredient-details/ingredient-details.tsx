import { FC } from 'react';
import { useAppSelector } from '../../hooks/useStore';
import { useLocation, useParams, Location } from 'react-router-dom';
import {
  selectBurgerIngredientById,
  selectBurgerIngredientsState,
} from '../../services/selectors/ingredients';
import { Loader } from '../loader/loader';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { IBurgerIngredient } from '../../utils/ts-types/ingredient-types';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import cn from 'classnames';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { isLoading }: IFetchState = useAppSelector(
    selectBurgerIngredientsState
  );
  const ingredient: IBurgerIngredient | undefined = useAppSelector(state =>
    selectBurgerIngredientById(state, id!)
  );

  const location: Location = useLocation();
  const background: Location | undefined = location.state?.background;

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={cn({
        [ingredientDetailsStyles.ingredient_details_page]: !background,
      })}
    >
      {ingredient ? (
        <>
          <h2
            className={cn(
              ingredientDetailsStyles.ingredient_header,
              'text text_type_main-large'
            )}
          >
            Детали ингредиента
          </h2>
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
            className={cn(
              ingredientDetailsStyles.nutrition_list,
              'pt-8',
              'pb-5'
            )}
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
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
