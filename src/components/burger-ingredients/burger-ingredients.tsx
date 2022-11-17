import React, { FC, useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { useAppSelector } from '../../hooks/useStore';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { selectBurgerIngredients } from '../../services/selectors/ingredients';
import {
  IBurgerIngredient,
  IngredientTypesEnum,
  TCategoryRef,
  TIngredientCategories,
} from '../../utils/ts-types/ingredient-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients: FC = () => {
  const burgerIngredients: Array<IBurgerIngredient> | null = useAppSelector(
    selectBurgerIngredients
  );

  const categoryIngredients: TIngredientCategories | null = useMemo(() => {
    if (!burgerIngredients) {
      return null;
    }
    const bunIds: Array<string> = burgerIngredients
      .filter(ing => ing.type === IngredientTypesEnum.BUN)
      .map(ing => ing._id);
    const sauceIds: Array<string> = burgerIngredients
      .filter(ing => ing.type === IngredientTypesEnum.SAUCE)
      .map(ing => ing._id);
    const mainIds: Array<string> = burgerIngredients
      .filter(ing => ing.type === IngredientTypesEnum.MAIN)
      .map(ing => ing._id);
    return {
      [IngredientTypesEnum.BUN]: {
        title: 'Булки',
        ingredientIds: bunIds,
        categoryRef: React.createRef<HTMLDivElement>(),
      },
      [IngredientTypesEnum.SAUCE]: {
        title: 'Соусы',
        ingredientIds: sauceIds,
        categoryRef: React.createRef<HTMLDivElement>(),
      },
      [IngredientTypesEnum.MAIN]: {
        title: 'Начинки',
        ingredientIds: mainIds,
        categoryRef: React.createRef<HTMLDivElement>(),
      },
    };
  }, [burgerIngredients]);

  const [currentIngRef, setCurrentIngRef] = useState<TCategoryRef | null>(
    categoryIngredients?.bun.categoryRef ?? null
  );

  const refInViewport: TCategoryRef | null = useIsInViewport(
    categoryIngredients
      ? Object.values(categoryIngredients).map(v => v.categoryRef)
      : []
  );

  useEffect(() => {
    setCurrentIngRef(refInViewport);
  }, [refInViewport]);

  const onTabSelected = (category: string): void => {
    const ingRef: TCategoryRef | null =
      categoryIngredients?.[category as keyof TIngredientCategories]
        .categoryRef ?? null;
    setCurrentIngRef(ingRef);
    ingRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className={burgerIngredientsStyles.tabs}>
        {categoryIngredients &&
          Object.keys(categoryIngredients).map(type => {
            return (
              <Tab
                key={type}
                value={type}
                active={
                  currentIngRef ===
                  categoryIngredients[type as keyof TIngredientCategories]
                    .categoryRef
                }
                onClick={onTabSelected}
              >
                {categoryIngredients[type as keyof TIngredientCategories].title}
              </Tab>
            );
          })}
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredients_container} custom-scroll`}
      >
        {categoryIngredients &&
          Object.keys(categoryIngredients).map(type => {
            return (
              <IngredientsCategory
                key={type}
                title={
                  categoryIngredients[type as keyof TIngredientCategories].title
                }
                ingredientIds={
                  categoryIngredients[type as keyof TIngredientCategories]
                    .ingredientIds
                }
                categoryRef={
                  categoryIngredients[type as keyof TIngredientCategories]
                    .categoryRef
                }
              />
            );
          })}
      </div>
    </>
  );
};
