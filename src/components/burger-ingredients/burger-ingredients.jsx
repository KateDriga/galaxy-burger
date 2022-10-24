import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { loadIngredients } from '../../services/thunks/ingredients';
import {
  selectBurgerIngredients,
  selectBurgerIngredientsState,
} from '../../services/selectors/ingredients';
import { selectModalIngredientId } from '../../services/selectors/modal';
import { clearModalIngredientId } from '../../services/slices/modal';
import { INGREDIENT_TABS } from '../../utils/const-variables/ingredient-variables';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const burgerIngredients = useSelector(selectBurgerIngredients);
  const { isFailed: failLoadingIngredients } = useSelector(
    selectBurgerIngredientsState
  );
  const modalIngredientId = useSelector(selectModalIngredientId);
  const handleCloseModal = () => dispatch(clearModalIngredientId());

  const categoryIngredients = useMemo(() => {
    if (!burgerIngredients) {
      return null;
    }
    const bunIds = burgerIngredients
      .filter(ing => ing.type === 'bun')
      .map(ing => ing._id);
    const sauceIds = burgerIngredients
      .filter(ing => ing.type === 'sauce')
      .map(ing => ing._id);
    const mainIds = burgerIngredients
      .filter(ing => ing.type === 'main')
      .map(ing => ing._id);
    return {
      bun: { ingredientIds: bunIds, categoryRef: React.createRef() },
      sauce: { ingredientIds: sauceIds, categoryRef: React.createRef() },
      main: { ingredientIds: mainIds, categoryRef: React.createRef() },
    };
  }, [burgerIngredients]);

  const [currentIngRef, setCurrentIngRef] = useState(
    categoryIngredients?.bun.categoryRef
  );

  const refInViewport = useIsInViewport(
    categoryIngredients
      ? Object.values(categoryIngredients).map(v => v.categoryRef)
      : []
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
    !failLoadingIngredients && (
      <>
        <div className={burgerIngredientsStyles.tabs}>
          {categoryIngredients &&
            INGREDIENT_TABS.map(t => {
              return (
                <Tab
                  key={t.type}
                  value={t.type}
                  active={
                    currentIngRef === categoryIngredients[t.type].categoryRef
                  }
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
          {categoryIngredients &&
            INGREDIENT_TABS.map(t => {
              return (
                <IngredientsCategory
                  key={t.type}
                  title={t.label}
                  ingredientIds={categoryIngredients[t.type].ingredientIds}
                  categoryRef={categoryIngredients[t.type].categoryRef}
                />
              );
            })}
        </div>
        {modalIngredientId && (
          <Modal title="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        )}
      </>
    )
  );
};
