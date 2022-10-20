import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { INGREDIENTS_TABS } from '../../utils/appConstVariables';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { IngredientsContext, ModalContext } from '../services/app-context';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

export const BurgerIngredients = () => {
  const burgerIngredients = useContext(IngredientsContext);
  const { modalIngredientId, setModalIngredientId } = useContext(ModalContext);

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

  const handleCloseModal = () => setModalIngredientId(null);
  const getIngredient = () =>
    burgerIngredients.find(i => i._id === modalIngredientId);

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
      {modalIngredientId && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={getIngredient()} />
        </Modal>
      )}
    </>
  );
};
