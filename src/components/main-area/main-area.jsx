import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Loader } from '../loader/loader';
import { useEffect, useMemo, useState } from 'react';
import { BASE_URL } from '../../utils/appConstVariables';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import mainAreaStyles from './main-area.module.css';
import cn from 'classnames';

export const MainArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [burgerIngredients, setBurgerIngredients] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      setIsLoading(true);
      fetch(BASE_URL)
        .then(res => res.json())
        .then(ingredients => {
          setBurgerIngredients(ingredients.data);
          setIsLoading(false);
        })
        .catch(e => {
          console.error(e);
          setIsLoading(false);
        });
    };
    getIngredients();
  }, []);

  // TODO: replace with Drag'n'Drop user choice
  const testConstructorIngredients = useMemo(() => {
    const bunIng = burgerIngredients?.find(ing => ing.type === 'bun');
    const midIngs = burgerIngredients?.slice(1, -1);
    return [bunIng, midIngs];
  }, [burgerIngredients]);

  return (
    <main className={cn(mainAreaStyles.main_area, 'p-10')}>
      {isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <div className={mainAreaStyles.section_container}>
            <>
              <section className={mainAreaStyles.section}>
                <h2 className="text text_type_main-large pb-5">
                  Соберите бургер
                </h2>
                <BurgerIngredients burgerIngredients={burgerIngredients} />
              </section>
              <section className={cn(mainAreaStyles.section, 'pt-15')}>
                <BurgerConstructor
                  bunIngredient={testConstructorIngredients[0]}
                  midIngredients={testConstructorIngredients[1]}
                />
              </section>
            </>
          </div>
        </ErrorBoundary>
      )}
    </main>
  );
};
