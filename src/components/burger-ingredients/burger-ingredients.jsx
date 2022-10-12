import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { INGREDIENTS_TABS } from '../../utils/appConstVariables';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/effects/ingredients';
import { selectBurgerIngredients } from '../../services/selectors/ingredients';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);
  const burgerIngredients = useSelector(selectBurgerIngredients);

  const categoryIngredients = useMemo(() => {
    const buns = burgerIngredients.filter(ing => ing.type === 'bun');
    const sauces = burgerIngredients.filter(ing => ing.type === 'sauce');
    const mains = burgerIngredients.filter(ing => ing.type === 'main');
    return {
      bun: { ingredients: buns, categoryRef: React.createRef() },
      sauce: { ingredients: sauces, categoryRef: React.createRef() },
      main: { ingredients: mains, categoryRef: React.createRef() },
    };
  }, [burgerIngredients]);

  const [currentIngRef, setCurrentIngRef] = useState(
    categoryIngredients.bun.categoryRef
  );

  const refInViewport = useIsInViewport(
    Object.values(categoryIngredients).map(v => v.categoryRef)
  );

  useEffect(() => {
    setCurrentIngRef(refInViewport);
  }, [refInViewport]);

  const onTabSelected = category => {
    const ingRef = categoryIngredients[category].categoryRef;
    setCurrentIngRef(ingRef);
    ingRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className={burgerIngredientsStyles.tabs}>
        {INGREDIENTS_TABS.map(t => {
          return (
            <Tab
              key={t.type}
              value={t.type}
              active={currentIngRef === categoryIngredients[t.type].categoryRef}
              onClick={onTabSelected}
            >
              {t.label}
            </Tab>
          );
        })}
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredients_container} custom-scroll`}
      >
        {INGREDIENTS_TABS.map(t => {
          return (
            <IngredientsCategory
              key={t.type}
              title={t.label}
              ingredients={categoryIngredients[t.type].ingredients}
              categoryRef={categoryIngredients[t.type].categoryRef}
            />
          );
        })}
      </div>
    </>
  );
};
