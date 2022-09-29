import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsData from '../../utils/data.json';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { useIsInViewport } from '../../hooks/useIsInViewport';

export const BurgerIngredients = () => {
  const ingLabels = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };
  const ingTypes = useMemo(() => {
    return [...new Set(ingredientsData.map(i => i['type']))];
  }, []);

  const [currentIngType, setCurrentIngType] = useState(ingTypes[0]);

  const ingTypeRefs = useMemo(() => {
    const refs = new Map();
    ingTypes.forEach(t => refs.set(t, React.createRef()));
    return refs;
  }, [ingTypes]);

  const refInViewport = useIsInViewport(ingTypeRefs);

  useEffect(() => {
    const ingType = [...ingTypeRefs.entries()].find(
      ([_, v]) => v.current === refInViewport
    )?.[0];
    if (ingType) {
      setCurrentIngType(ingType);
    }
  }, [ingTypeRefs, refInViewport]);

  const onTabSelected = value => {
    setCurrentIngType(value);
    ingTypeRefs.get(value).current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className={burgerIngredientsStyles.tabs}>
        {ingTypes.map(t => {
          return (
            <Tab
              key={t}
              value={t}
              active={currentIngType === t}
              onClick={onTabSelected}
            >
              {ingLabels[t] ?? 'Прочее'}
            </Tab>
          );
        })}
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredients_container} custom-scroll`}
      >
        {ingTypes.map(t => {
          return (
            <div key={t} ref={ingTypeRefs.get(t)}>
              <h3 className="text text_type_main-medium pt-10">
                {ingLabels[t] ?? 'Прочее'}
              </h3>
              <div className={burgerIngredientsStyles.ingredients}>
                {ingredientsData
                  .filter(i => i['type'] === t)
                  .map(i => (
                    <BurgerIngredient
                      key={i['_id']}
                      imgSrc={i['image']}
                      imgSrcMobile={i['image_mobile']}
                      price={i['price']}
                      ingName={i['name']}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
