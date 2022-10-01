import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';
import { INGREDIENTS_TABS } from '../../utils/appConstVariables';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

export const BurgerIngredients = ({ burgerIngredients }) => {
  const categoryIngredientsMap = useMemo(() => {
    const buns = burgerIngredients.filter(ing => ing.type === 'bun');
    const sauces = burgerIngredients.filter(ing => ing.type === 'sauce');
    const mains = burgerIngredients.filter(ing => ing.type === 'main');
    return new Map([
      ['bun', buns],
      ['sauce', sauces],
      ['main', mains],
    ]);
  }, [burgerIngredients]);

  const [currentIngType, setCurrentIngType] = useState('bun');

  const ingTypeRefsMap = useMemo(() => {
    const refs = new Map();
    INGREDIENTS_TABS.forEach(t => refs.set(t.type, React.createRef()));
    return refs;
  }, []);

  const refInViewport = useIsInViewport(ingTypeRefsMap);

  useEffect(() => {
    const ingType = [...ingTypeRefsMap.entries()].find(
      ([_, v]) => v.current === refInViewport
    )?.[0];
    if (ingType) {
      setCurrentIngType(ingType);
    }
  }, [ingTypeRefsMap, refInViewport]);

  const onTabSelected = value => {
    setCurrentIngType(value);
    ingTypeRefsMap.get(value).current.scrollIntoView({
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
              active={currentIngType === t.type}
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
              ingredients={categoryIngredientsMap.get(t.type)}
              categoryRef={ingTypeRefsMap.get(t.type)}
            />
          );
        })}
      </div>
    </>
  );
};

BurgerIngredients.propTypes = {
  burgerIngredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPES).isRequired,
};
